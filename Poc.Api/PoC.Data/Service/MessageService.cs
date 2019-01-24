using PoC.Data.Model;
using PoC.Data.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Service
{
    public class MessageService : IMessageService
    {
        ICassandraRepository _cassandraRepository;

        public MessageService(ICassandraRepository cassandraRepository)
        {
            _cassandraRepository = cassandraRepository;
            AllEvents = new ConcurrentStack<MessageEvent>();
        }
        public IEnumerable<Message> Get()
        {
            return _cassandraRepository.Get<Message>();
        }

        public Message AddMessage(Message message)
        {
            _cassandraRepository.AddMessage(message);
            if (message.Speed > 50 || message.Fuel<2)
            {
                string alert = "";
                alert = (message.Speed > 50) ? "Speed Exceeded" : "";
                alert = (message.Fuel < 2) ? ((alert=="")?"Low Fuel":alert+"|Low Fuel") : alert;
                var messageEvent =
                new MessageEvent(message.Id, message.IMEI, message.Speed,message.Fuel, message.ActualDate, alert);

                this.AddEvent(messageEvent);
            }
            return message;
        }


        private readonly System.Reactive.Subjects.ISubject<MessageEvent> _eventStream = new ReplaySubject<MessageEvent>(1);
        public ConcurrentStack<MessageEvent> AllEvents { get; }

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
