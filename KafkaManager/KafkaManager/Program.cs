using System;
using Topshelf;

namespace KafkaManager
{
    class Program
    {
        static void Main(string[] args)
        {
            HostFactory.Run(configure =>
            {
                configure.Service<KafkaConsumer>(service =>
                {
                    service.ConstructUsing(s => new KafkaConsumer());
                    service.WhenStarted(s => s.ReceiveMessage());
                    service.WhenStopped(s => s.Stop());
                });
                //Setup Account that window service use to run.  
                configure.RunAsLocalSystem();
                configure.SetServiceName("KafkaManagerWithTopshelf");
                configure.SetDisplayName("KafkaManagerWithTopshelf");
                configure.SetDescription("Kafka Manager with Topshelf");
            });
        }
    }
}
