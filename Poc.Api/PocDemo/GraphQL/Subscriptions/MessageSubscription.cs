using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using GraphQL.Subscription;
using GraphQL.Resolvers;
using PoC.Data.Service;
using PoC.Api.GraphQL.Types;
using PoC.Data.Model;
using System.Reactive.Linq;

namespace PoC.Api.GraphQL.Subscriptions
{
    public class MessageSubscription : ObjectGraphType<object>
    {
        private readonly IMessageService _events;
        public MessageSubscription(IMessageService events)
        {
            _events = events;
            Name = "MessageSubscription";
            AddField(new EventStreamFieldType
            {
                Name = "limitExceeded",
                Type = typeof(MessageEventType),
                Resolver = new FuncFieldResolver<MessageEvent>(ResolveMessageEvent),
                Subscriber = new EventStreamResolver<MessageEvent>(Subscribe)
            });
        }

        private IObservable<MessageEvent> Subscribe(ResolveEventStreamContext ctx)
        {
            return _events.EventStream();
        }

        private MessageEvent ResolveMessageEvent(ResolveFieldContext ctx)
        {
            var message = ctx.Source as MessageEvent;
            return message;
        }
    }
}
