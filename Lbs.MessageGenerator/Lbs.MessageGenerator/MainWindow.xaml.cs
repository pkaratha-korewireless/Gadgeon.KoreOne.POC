using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Lbs.MessageGenerator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        //private int Interval { get; set; }
        //private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        //{
        //    Interval = Convert.ToInt32("5");
        //}

        //private void TextBox_TextChanged_1(object sender, TextChangedEventArgs e)
        //{

        //}

        //private void TextBox_TextChanged_2(object sender, TextChangedEventArgs e)
        //{

        //}

        //private void TextBox_TextChanged_3(object sender, TextChangedEventArgs e)
        //{

        //}

        //private void TextBox_TextChanged_4(object sender, TextChangedEventArgs e)
        //{

        //}

        //private void TextBox_TextChanged_5(object sender, TextChangedEventArgs e)
        //{

        //}

        //private void Button_Click(object sender, RoutedEventArgs e)
        //{

        //    Tcp.TCPWriter.Connect("localhost", "test");
        //}

        private bool Started = false;
        private void StartBtn_Click(object sender, RoutedEventArgs e)
        {
            string message = string.Empty;
            message = Convert.ToString(this.txtIMEI.Text) + "," +
                      Convert.ToString(this.txtActualDate.Text) + "," +
                      Convert.ToString(this.txtLatitude.Text) + "," +
                      Convert.ToString(this.txtLongitude.Text) + "," +
                      Convert.ToString(this.txtDirection.Text) + "," +
                      Convert.ToString(this.txtOdotemer.Text) + "," +
                      Convert.ToString(this.txtSpeed.Text) + "," +
                      Convert.ToString(this.txtAnalog.Text) + "," +
                      Convert.ToString(this.txtTemp.Text) + "," +
                      Convert.ToString(this.txtEventCode.Text) + "," +
                      Convert.ToString(this.txtTextM.Text) + "," +
                      Convert.ToString(this.txtFuel.Text) + "," +
                      Convert.ToString(this.txtTemp2.Text) + "," +
                      Convert.ToString(this.txtVoltage.Text);

            MessageBox.Show("Sending Message..!");
            System.Threading.Thread.Sleep(5000);
            Tcp.TCPWriter.Connect("localhost", message);
        }

        private void EndBtn_Click(object sender, RoutedEventArgs e)
        {
            Started = false;
            MessageBox.Show("End");
        }
    }
}
