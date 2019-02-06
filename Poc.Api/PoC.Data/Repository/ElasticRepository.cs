using Nest;
using PoC.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Repository
{
    public class ElasticRepository : IElasticRepository
    {
        private readonly string INDEX_NAME = "device_messages";
        private readonly string URI = "http://localhost:9200";
        public ElasticClient client;
        public ElasticRepository()
        {
            var settings = new ConnectionSettings(new Uri(URI)).DefaultIndex(INDEX_NAME);
            client = new ElasticClient(settings);
        }
        public async Task<IEnumerable<Message>> Get()
        {
            var searchResponse = await client.SearchAsync<ElasticMessage>(s => s
            .From(0)
            .Query(q => q
            .Match(m=>m)));
            //  Result from elastic index. List of ElasticMessage I guess ;p
            var elasticlist = searchResponse.Documents;

            var messagelist = new List<Message>();
            foreach(var message in elasticlist)
            {
                // Mapping every element of ElaticMessage list to Message list
                messagelist.Add(MessageMapper.Map(message));
            }
            return messagelist;
        }
    }
}
