using System;
using System.Collections.Generic;
using System.Text;
using Confluent.Kafka;
using Confluent.Kafka.Serialization;
using Newtonsoft.Json;

namespace KafkaManager
{
    class KafkaProducer
    {
       
        public void SendMessage(string message)
        {

            ConfigurationBase config = new ConfigurationBase();
            var topic = config.GetTopic();
            var publisherConfig = config.GetPublisherConfig();
            var seriel = new StringSerializer();
            var producer = new Producer<Null, string>(publisherConfig, null, new StringSerializer(Encoding.UTF8));
            producer.ProduceAsync(topic, null, JsonConvert.SerializeObject(message));
            //docker run -p 2181:2181 -p 9092:9092 --env ADVERTISED_HOST=localhost --env ADVERTISED_PORT=9092 spotify/kafka
            //kafka-console-consumer --bootstrap-server 192.168.65.187:9092 --topic priyesh-test --from-beginning
            //kafka-topics --list--zookeeper localhost:2181
        }
    }
}
