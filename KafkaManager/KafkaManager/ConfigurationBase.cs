using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace KafkaManager
{
    class ConfigurationBase
    {
        private readonly IConfiguration _iConfiguration;
        public ConfigurationBase(IConfiguration iconfiguration)
        {
            _iConfiguration = iconfiguration;
        }
        public ConfigurationBase()
        {
            if (_iConfiguration == null)
            {
                _iConfiguration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json").Build();
            }
        }

        public Dictionary<string, object> GetPublisherConfig()
        {
            var publisherConfig = new Dictionary<string, object>()
            {
                ["bootstrap.servers"] = _iConfiguration["brokerList"],
                ["retries"] = 0,
                ["client.id"] = 1,
                ["batch.num.messages"] = 1,
                ["socket.blocking.max.ms"] = 1,
                ["socket.nagle.disable"] = true,
                ["queue.buffering.max.ms"] = 0,
                ["default.topic.config"] = new Dictionary<string, object>
                {
                    ["acks"] = 1
                }
            };
            return publisherConfig;
        }

        public string GetTopic()
        {
            return _iConfiguration["topic"];
        }

        public Dictionary<string, object> GetConsumerConfig()
        {
            return new Dictionary<string, object>
                {
                    {"group.id", 1},
                    {"bootstrap.servers", _iConfiguration["brokerList"]},
                    {
                        "default.topic.config", new Dictionary<string, object>
                        {
                            {"auto.offset.reset", "smallest"}
                        }
                    },
                    {"enable.auto.commit", true}
                };
        }

    }
}
