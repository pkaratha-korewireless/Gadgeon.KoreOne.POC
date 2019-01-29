using Cassandra;
using Cassandra.Mapping;
using PoC.Data.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Repository
{
    public class CassandraRepository : ICassandraRepository
    {
        private readonly string END_POINT = "127.0.0.1";
        private readonly string KEY_SPACE = "koreone";
        private readonly string TABLE_NAME = "device_messages";

        private Cluster cluster;
        private ISession session;
        private IMapper mapper;

        public CassandraRepository()
        {
            cluster = Cluster.Builder().AddContactPoint(END_POINT).Build();
            session = cluster.Connect(KEY_SPACE);
            mapper = new Mapper(session);
        }

        public Message AddMessage(Message message)
        {
            //Convert datetime to timestamp
            var timestamp = message.actual_date;
            var query = $"INSERT INTO {KEY_SPACE}.{TABLE_NAME}" +
                $"(id,imei,actual_date,latitude,longitude,direction,odometer,speed,temperature,fuel,voltage)" +
                $" VALUES" +
                $"(uuid(),'{message.imei}',{message.actual_date},{message.latitude},{message.longitude}" +
                $",{message.direction},{message.odometer},{message.speed},{message.temperature},{message.fuel}" +
                $",{message.voltage});";
            var result = session.Execute(query);
            return message;
        }

        public IEnumerable<T> Get<T>()
        {
            var query = $"select * from {KEY_SPACE}.{TABLE_NAME} limit 20;";
            IEnumerable<T> result = mapper.Fetch<T>(query);
            return result;
        }

    }
}
