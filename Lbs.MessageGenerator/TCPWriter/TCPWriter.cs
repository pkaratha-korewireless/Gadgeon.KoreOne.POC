using System;
using System.Net.Sockets;

namespace TCPWriter
{
    public class TCPWriter
    {
        static void Connect(String server, String message)
        {
            try
            {
                // Create a TcpClient.
                // Note, for this client to work you need to have a TcpServer
                // connected to the same address as specified by the server, port
                // combination.
                Int32 port = 5150;
                TcpClient client = new TcpClient(server, port);


                // Translate the passed message into ASCII and store it as a Byte array.
                Byte[] data = System.Text.Encoding.ASCII.GetBytes(message);


                // Get a client stream for reading and writing.
                //  Stream stream = client.GetStream();


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
