using PoC.Data.Model;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PoC.Data.Service
{
    public interface IMessageService
    {
        IEnumerable<Message> Get();
        Message AddMessage(Message message);

        ConcurrentStack<MessageEvent> AllEvents { get; }
        void AddError(Exception exception);
        MessageEvent AddEvent(MessageEvent messageEvent);
        IObservable<MessageEvent> EventStream();
    }
}
