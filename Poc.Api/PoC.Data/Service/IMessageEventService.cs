using PoC.Data.Model;
using System;
using System.Collections.Concurrent;

namespace PoC.Data.Service
{
    public interface IMessageEventService
    {
        ConcurrentStack<MessageEvent> AllEvents { get; }
        void AddError(Exception exception);
        MessageEvent AddEvent(MessageEvent messageEvent);
        IObservable<MessageEvent> EventStream();
    }
}
