using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft;
using Newtonsoft.Json;
using System.Threading;

namespace KafkaManager
{
    public class ReadExcel
    {
        public static void ReadFile()
        {
            for (int i = 1; i < 5; i++)
            {
                var filePath = $@"D:\location-coordinates\{i}\track_points.xlsx";
                FileInfo file = new FileInfo(filePath);
                try
                {
                    using (ExcelPackage package = new ExcelPackage(file))
                    {
                        StringBuilder sb = new StringBuilder();
                        ExcelWorksheet worksheet = package.Workbook.Worksheets.First();
                        int rowCount = worksheet.Dimension.Rows;
                        int ColCount = 2;
                        var rawText = string.Empty;
                        var message = new Message();
                        for (int row = 2; row <= rowCount; row++)
                        {
                            message.IMEI = $"1234{i}";
                            message.Odotemer = 5 + row % 20;
                            message.Voltage = 50 + row % 20;
                            message.Speed = 48 + row % 20;
                            message.Temp = row % 20;
                            message.ActualDate = DateTime.Now;
                            for (int col = 1; col <= ColCount; col++)
                            {
                                if (col % 2 == 0)
                                {
                                    message.Lon = worksheet.Cells[row, col].Value.ToString();
                                }
                                else
                                {
                                    message.Lat = worksheet.Cells[row, col].Value.ToString();
                                }
                            }
                            var messageSpeed = $"{message.IMEI},{message.ActualDate},{message.Lat},{message.Lon},{message.Direction},{message.Odotemer},{message.Speed},0,{message.Temp},2, 9,0,2,12.0";
                            var json = JsonConvert.SerializeObject(message);
                            Thread.Sleep(2000);
                            try
                            {
                                KafkaProducer producer1 = new KafkaProducer();
                                KafkaProducer producer2 = new KafkaProducer("aaa-mapdata");
                                producer1.SendMessage(messageSpeed);
                                producer2.SendMessage(json);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Error in Sending KafkaMessage", ex.Message);
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Occured:", ex.Message);
                }
                
            }
        }
    }

    public class Message
    {
        
        public string IMEI { get; set; }
        public DateTime ActualDate { get; set; }
        public decimal Direction { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public decimal Odotemer { get; set; }
        public decimal Speed { get; set; }
        public decimal Temp { get; set; }
        public decimal Fuel { get; set; }
        public decimal Voltage { get; set; }


    }
}
