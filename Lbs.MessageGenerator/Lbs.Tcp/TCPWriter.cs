using System;
using System.Net;
using System.Net.Sockets;

namespace Lbs.Tcp
{
    public class TCPWriter
    {
        public static void Connect(String server, String message)
        {
            TcpListener server1 = null;
            try
            {
                Int32 port = 5150;
                IPAddress localAddr = IPAddress.Parse("127.0.0.1");
                server1 = new TcpListener(localAddr, port);
                server1.Start();
                TcpClient client = new TcpClient(server, port);
                Byte[] data = System.Text.Encoding.ASCII.GetBytes(message);

                NetworkStream stream = client.GetStream();

                // Send the message to the connected TcpServer. 
                stream.Write(data, 0, data.Length);
                // Close everything.
                stream.Close();
                client.Close();
            }
            catch (ArgumentNullException e)
            {


            }
            catch (SocketException e)
            {


            }




        }
    }
}
