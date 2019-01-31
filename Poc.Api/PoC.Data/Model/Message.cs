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
        public decimal latitude { get; set; }
        public decimal longitude { get; set; }
        public decimal direction { get; set; }
        public decimal odometer { get; set; }
        public decimal speed { get; set; }
        public decimal temperature { get; set; }
        public decimal fuel { get; set; }
        public decimal voltage { get; set; }
    }
}
