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
            Field(e => e.EventGuid);
            Field(e => e.Id);
            Field(e => e.Imei);
            Field(e => e.Speed);
            Field(e => e.Fuel);
            Field(e => e.Timestamp);
            Field(e => e.Alert);
        }
    }
}
