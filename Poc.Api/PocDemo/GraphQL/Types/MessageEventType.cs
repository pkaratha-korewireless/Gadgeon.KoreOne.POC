using GraphQL.Types;
using PoC.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoC.Api.GraphQL.Types
{
    public class MessageEventType : ObjectGraphType<MessageEvent>
    {
        public MessageEventType()
        {
            Name = "MessageEvent";
            foreach (var prop in typeof(MessageEvent).GetProperties())
            {
                Field(prop.Name, x => prop.GetValue(x), type: Helper.Map[prop.PropertyType]);
            }
        }
    }
}
