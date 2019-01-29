using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{
    public class Message
    {
        public Guid? id { get; set; }
        public string imei { get; set; }
        public DateTime actual_date { get; set; }
        public float latitude { get; set; }
        public float longitude { get; set; }
        public float direction { get; set; }
        public float odometer { get; set; }
        public float speed { get; set; }
        public float temperature { get; set; }
        public float fuel { get; set; }
        public float voltage { get; set; }
    }
}
