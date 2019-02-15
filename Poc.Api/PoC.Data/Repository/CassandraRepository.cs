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
        private readonly string END_POINT = "192.168.65.146";
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
            var timestamp = ConvertToTimestamp(message.actual_date);
            var query = $"INSERT INTO {KEY_SPACE}.{TABLE_NAME}" +
                $"(id,imei,actual_date,latitude,longitude,direction,odometer,speed,temperature,fuel,voltage)" +
                $" VALUES" +
                $"(uuid(),'{message.imei}',{timestamp},{message.latitude},{message.longitude}" +
                $",{message.direction},{message.odometer},{message.speed},{message.temperature},{message.fuel}" +
                $",{message.voltage});";
            var result = session.Execute(query);
            return message;
        }

        public IEnumerable<T> Get<T>(string imei)
        {
            string query;
            if(imei==null)
                query = $"select * from {KEY_SPACE}.{TABLE_NAME} limit 20;";
            else
                query = $"select * from {KEY_SPACE}.{TABLE_NAME} where imei = '{imei}' order by actual_date desc limit 20;";
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
