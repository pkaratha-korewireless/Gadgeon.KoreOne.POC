using GraphQL.Types;
using PoC.Api.GraphQL.Queries;
using PoC.Api.GraphQL.Types;
using PoC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Poc.Api
{
    public class PoCQuery : ObjectGraphType<object>
    {
        public PoCQuery(IMessageService messageService)
        {
            Name = "PoCQueries";
            Field<MessageQuery>("MessageQuery", resolve: arg => messageService);
        }
    }
}
