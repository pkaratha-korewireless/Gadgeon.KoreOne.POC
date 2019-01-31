using GraphQL.Types;
using PoC.Api.GraphQL.Types;
using PoC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoC.Api.GraphQL.Queries
{
    public class MessageQuery : ObjectGraphType<object>
    {
        public MessageQuery(IMessageService messageService)
        {
            Name = "MessageQuery";
            Field<ListGraphType<MessageType>>(
                name: "get_cassandra_data",
                description:"Get last 20 rows from cassandra table",
                resolve: context => messageService.GetCassandraData());

            Field<ListGraphType<MessageType>>(
                name: "get_elastic_data",
                description: "Get data from elastic search indices",
                resolve: context => messageService.GetElasticData());
        }
    }
}
