using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Text;
using System.Threading.Tasks;
using PoC.Data.Model;

namespace PoC.Data.Service
{
    public class MessageEventService : IMessageEventService
    {
        private readonly System.Reactive.Subjects.ISubject<MessageEvent> _eventStream = new ReplaySubject<MessageEvent>(1);
        public ConcurrentStack<MessageEvent> AllEvents { get; }

        public MessageEventService()
        {
            AllEvents = new ConcurrentStack<MessageEvent>();
        }

        public void AddError(Exception exception)
        {
            _eventStream.OnError(exception);
        }

        public MessageEvent AddEvent(MessageEvent messageEvent)
        {
            AllEvents.Push(messageEvent);
            _eventStream.OnNext(messageEvent);
            return messageEvent;
        }

        public IObservable<MessageEvent> EventStream()
        {
            return _eventStream.AsObservable();
        }
    }
}
