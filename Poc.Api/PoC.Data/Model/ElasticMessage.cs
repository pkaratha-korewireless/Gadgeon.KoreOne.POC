using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{

    [ElasticsearchType(Name = "message")]
    public class ElasticMessage
    {
        public string MessageId { get; set; }
        public string IMEI { get; set; }
        public DateTime ActualDate { get; set; }
        public GeoLocation Location { get; set; }
        public double Direction { get; set; }
        public double Odotemer { get; set; }
        public float Speed { get; set; }
        public float Temp { get; set; }
        public float Fuel { get; set; }
        public double Voltage { get; set; }
        public string Status { get; set; }
    }
}