using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Model
{
    public class MessageMapper
    {
        public static Message Map(ElasticMessage source)
        {
            Message message = new Message();
            message.id = Guid.Parse(source.MessageId);
            message.imei = source.IMEI;
            message.actual_date = source.ActualDate;
            message.latitude = (decimal)source.Location.Latitude;
            message.longitude = (decimal)source.Location.Longitude;
            message.direction = (decimal)source.Direction;
            message.odometer = (decimal)source.Odotemer;
            message.speed = (decimal)source.Speed;
            message.temperature = (decimal)source.Temp;
            message.fuel = (decimal)source.Fuel;
            message.voltage = (decimal)source.Voltage;

            return message;
        }
    }
}