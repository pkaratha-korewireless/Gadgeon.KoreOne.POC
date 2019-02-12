using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Configuration;

namespace Poc.Data
{
    public class ConfigurationBase
    {
        private readonly IConfiguration _configuration;

        public ConfigurationBase(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public ConfigurationBase()
        {

            if (_configuration == null)
            {
                //_configuration = new ConfigurationBuilder()
                //    .SetBasePath(Directory.GetCurrentDirectory())
                //    .AddJsonFile("appsettings.json").Build();
            }
        }

        public string GetCassandraEndpoint()
        {
            return _configuration["127.0.0.1"];
        }

        public string GetCassandraKeyspace()
        {
            return _configuration["koreone"];
        }

        public string GetCassandraTable()
        {
            return _configuration["device_messages"];
        }

        public string GetElasticIndex()
        {
            return _configuration["device_messages"];
        }

        public string GetElasticUri()
        {
            return _configuration["http://localhost:9200"];
        }
    }
}
