using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{
    public class MessageEvent
    {
        public MessageEvent(Guid id, string imei, float speed, float fuel,DateTime actual_date, string alert)
        {
            this.id = id;
            this.imei = imei;
            this.speed = speed;
            this.fuel = fuel;
            this.actual_date = actual_date;
            this.alert = alert;
            EventGuid = Guid.NewGuid().ToString();
        }

        public Guid id  { get; set; }
        public string EventGuid { get; set; }
        public string imei { get; set; }
        public float speed { get; set; }
        public float fuel { get; set; }
        public DateTime actual_date { get; private set; }
        public string alert { get; set; }
    }
}
