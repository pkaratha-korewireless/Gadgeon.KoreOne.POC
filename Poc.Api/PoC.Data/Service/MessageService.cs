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
        IElasticRepository _elasticRepository;

        public MessageService(ICassandraRepository cassandraRepository, IElasticRepository elasticRepository)
        {
            _cassandraRepository = cassandraRepository;
            _elasticRepository = elasticRepository;
            AllEvents = new ConcurrentStack<Message>();
        }
        public IEnumerable<Message> GetCassandraData()
        {
            return _cassandraRepository.Get<Message>();
        }

        public IEnumerable<Message> GetElasticData()
        {
            return _elasticRepository.Get().Result;
        }

        public Message AddMessage(Message message)
        {
            _cassandraRepository.AddMessage(message);
            this.AddEvent(message);
            return message;
        }


        private readonly System.Reactive.Subjects.ISubject<Message> _eventStream = new ReplaySubject<Message>(1);
        public ConcurrentStack<Message> AllEvents { get; }

        public void AddError(Exception exception)
        {
            _eventStream.OnError(exception);
        }

        public Message AddEvent(Message message)
        {
            AllEvents.Push(message);
            _eventStream.OnNext(message);
            return message;
        }

        public IObservable<Message> EventStream()
        {
            return _eventStream.AsObservable();
        }

    }
}
