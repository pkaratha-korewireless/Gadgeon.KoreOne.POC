using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using Confluent.Kafka;
using Confluent.Kafka.Serialization;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace KafkaManager
{
    class KafkaConsumer
    {
        private bool _shutdown = false;
        public static HttpClient client = new HttpClient();
        public KafkaConsumer()
        {
            client.BaseAddress = new Uri("https://localhost:44380");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public void ReceiveMessage()
        {
            

            ConfigurationBase config = new ConfigurationBase();
            var topicSpeed = config.GetTopicSpeed();
            var topicDevice = "aaa-mapdata";
            var publisherConfig = config.GetConsumerConfig();
            var seriel = new StringSerializer();

            var consumerDevice = new Consumer<Null, string>(publisherConfig, null, new StringDeserializer(Encoding.UTF8));
            consumerDevice.Subscribe(topicDevice);
            var consumerSpeed = new Consumer<Null, string>(publisherConfig, null, new StringDeserializer(Encoding.UTF8));
            consumerSpeed.Subscribe(topicSpeed);
            consumerSpeed.OnMessage += (_, msg) =>
            {
                Console.WriteLine($"Topic: {msg.Topic} Partition: {msg.Partition} Offset: {msg.Offset} {msg.Value}");

                var res = CallSignalRAPI(msg.Value, msg.Topic);
                consumerSpeed.CommitAsync(msg);
            };
            consumerDevice.OnMessage += (_, msg) =>
            {
                Console.WriteLine($"Topic: {msg.Topic} Partition: {msg.Partition} Offset: {msg.Offset} {msg.Value}");

               var res = CallSignalRAPI(msg.Value, msg.Topic);
               consumerDevice.CommitAsync(msg);
            };
            consumerDevice.OnError += (_, error) =>
            {
                if (error.Code == ErrorCode.Local_Transport)
                {
                    Thread.Sleep(1000);
                    consumerDevice.Subscribe(topicDevice);
                }
                else
                {
                    Volatile.Write(ref _shutdown, true);
                }

            };
            consumerSpeed.OnError += (_, error) =>
            {
                if (error.Code == ErrorCode.Local_Transport)
                {
                    Thread.Sleep(1000);
                    consumerSpeed.Subscribe(topicDevice);
                }
                else
                {
                    Volatile.Write(ref _shutdown, true);
                }

            };
            while (!_shutdown)
            {
                consumerDevice.Poll(100);
                consumerSpeed.Poll(100);
            }


        }
        public void Stop()
        {
            _shutdown = true;
        }
        public static async Task<HttpResponseMessage> CallSignalRAPI(string message, string topic)
        {
            
            HttpResponseMessage response = new HttpResponseMessage();
            var content = new StringContent(message, Encoding.UTF8, "application/json");
            try
            {
                if(topic == "aaa-mapdata")
                {
                    response = client.PostAsync("api/message", content).Result;
                }
                else if(topic == "aaa-speedanalysis")
                {
                    var test = new DeviceSpeed { IMEI = message.Split(",")[0], Speed = message.Split(",")[1] };
                    var data = JsonConvert.SerializeObject(JsonConvert.SerializeObject(test).ToString()).ToString();
                    content = new StringContent(data, Encoding.UTF8, "application/json");
                    response = client.PostAsync("api/speedanalysis", content).Result;
                }
                
            }
            catch (Exception e) { }
            response.EnsureSuccessStatusCode();
            return response;
        }
    }
    public class DeviceSpeed
    {
        public string IMEI { set; get; }
        public string Speed { set; get; }
    }
}