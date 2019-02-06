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
            var topic = config.GetTopic();
            var publisherConfig = config.GetConsumerConfig();
            var seriel = new StringSerializer();

            var consumer = new Consumer<Null, string>(publisherConfig, null, new StringDeserializer(Encoding.UTF8));
            consumer.Subscribe(topic);

            consumer.OnMessage += (_, msg) =>
            {
                Console.WriteLine($"Topic: {msg.Topic} Partition: {msg.Partition} Offset: {msg.Offset} {msg.Value}");

                var res = CallSignalRAPI(msg.Value);
                consumer.CommitAsync(msg);
            };
            consumer.OnError += (_, error) =>
            {
                if (error.Code == ErrorCode.Local_Transport)
                {
                    Thread.Sleep(1000);
                    consumer.Subscribe(topic);
                }
                else
                {
                    Volatile.Write(ref _shutdown, true);
                }

            };
            while (!_shutdown)
            {
                consumer.Poll(100);
            }
        }
        public void Stop()
        {
            _shutdown = true;
        }
        public static async Task<HttpResponseMessage> CallSignalRAPI(string message)
        {
            var convertedMessage = JsonConvert.DeserializeObject(message);
            
            HttpResponseMessage response = new HttpResponseMessage();
            var content = new StringContent(message, Encoding.UTF8, "application/json");
            try
            {
                response = client.PostAsync("api/message", content).Result;
            }
            catch (Exception e) { }
            response.EnsureSuccessStatusCode();
            return response;
        }
    }
}