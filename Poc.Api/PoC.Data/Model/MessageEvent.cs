using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{
    public class MessageEvent
    {
        public MessageEvent(int id, string imei, decimal speed, int fuel,DateTime timestamp, string alert)
        {
            Id = id;
            Imei = imei;
            Speed = speed;
            Fuel = fuel;
            Timestamp = timestamp;
            Alert = alert;
            EventGuid = Guid.NewGuid().ToString();
        }

        public int Id { get; set; }
        public string EventGuid { get; set; }
        public string Imei { get; set; }
        public decimal Speed { get; set; }
        public int Fuel { get; set; }
        public DateTime Timestamp { get; private set; }
        public string Alert { get; set; }
    }
}
