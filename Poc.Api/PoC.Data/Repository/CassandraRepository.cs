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
        private readonly string KEY_SPACE = "pocdemo";
        private readonly string TABLE_NAME = "messagesdemo";

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
            var timestamp = ConvertToTimestamp(message.ActualDate);
            var query = $"INSERT INTO {TABLE_NAME}" +
                $"(id,imei,actualdate,latitude,longitude,direction,odometer,speed,analog,eventcode,textm,fuel,temp2,voltage)" +
                $" VALUES" +
                $"({message.Id},'{message.IMEI}',{timestamp},{message.Latitude},{message.Longitude}" +
                $",{message.Direction},{message.Odometer},{message.Speed},{message.Analog},{message.EventCode}" +
                $",{message.textM},{message.Fuel},{message.Temp2},{message.Voltage});";
            var result = session.Execute(query);
            return message;
        }

        public IEnumerable<T> Get<T>()
        {
            var query = $"select * from {TABLE_NAME} limit 20;";
            IEnumerable<T> result = mapper.Fetch<T>(query);
            return result;
        }

        private long ConvertToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000000;
            return epoch;
        }

    }
}
