using GraphQL.Resolvers;
using GraphQL.Subscription;
using GraphQL.Types;
using PoC.Api.GraphQL;
using PoC.Api.GraphQL.Types;
using PoC.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoC.Api
{
    public class PoCSubscription : ObjectGraphType
    {
        //private readonly Notifications _notifications;

        //public PoCSubscription(Notifications notifications)
        //{
        //    _notifications = notifications;
        //    Name = "Subscription";

        //    AddField(new EventStreamFieldType
        //    {
        //        Name = "speedExceeded",
        //        Type = typeof(MessageType),
        //        Resolver = new FuncFieldResolver<Message>(ResolveNotification),
        //        Subscriber = new EventStreamResolver<Message>(Subscribe)
        //    });
        //}

        //private IObservable<Message> Subscribe(ResolveEventStreamContext ctx)
        //{
        //    return _notifications.Messages();
        //}

        //private Message ResolveNotification(ResolveFieldContext ctx)
        //{
        //    var message = ctx.Source as Message;
        //    return message;
        //}
    }
}
