using GraphQL.Types;
using PoC.Api.GraphQL.InputTypes;
using PoC.Api.GraphQL.Mutations;
using PoC.Api.GraphQL.Types;
using PoC.Data.Model;
using PoC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoC.Api.GraphQL
{
    public class PoCMutation : ObjectGraphType<object>
    {
        public PoCMutation(IMessageService messageService)
        {
            Name = "PoCMutations";
            Field<MessageMutation>("MessageMutation", resolve: arg => messageService);
        }

    }
}
