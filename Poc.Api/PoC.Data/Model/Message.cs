using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{
    public class Message
    {
        public int Id { get; set; }
        public string IMEI { get; set; }
        public DateTime ActualDate { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public decimal Direction { get; set; }
        public decimal Odometer { get; set; }
        public int Speed { get; set; }
        public int Analog { get; set; }
        public int EventCode { get; set; }
        public int textM { get; set; }
        public int Fuel { get; set; }
        public int Temp2 { get; set; }
        public decimal Voltage { get; set; }


    }
}
