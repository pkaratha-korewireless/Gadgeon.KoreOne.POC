import { Component, OnInit, Output, OnDestroy, forwardRef } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { Apollo } from 'apollo-angular';
import { alertNotifierService } from 'app/services/alert-notifier.service';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { INotifications } from '../interfaces/message';

// const subscription = gql`
// subscription alerts{
//   limitExceeded{
//     id
//     imei
//     alert
//     eventGuid
//     fuel
//     speed
//     timestamp
//   }
// }`;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  //@Output() notifications: Array<any> = [];
  // error: any;
  // loading: boolean;
  // private subSubscription: Subscription;

  notifications: INotifications[] = [];

  constructor(private alertService: alertNotifierService) { }

  ngOnInit() {
    // this.subSubscription = this.apollo
    //   .subscribe({
    //     query: subscription
    //   })
    //   .subscribe(result => {
    //     console.log(result)
    //     this.notifications.push(result.data.limitExceeded);
    //     // tslint:disable-next-line:no-debugger
    //     // debugger;
    //   });
    //this.notifications = this.alertService.notifications;
    //this.getSocketData();
    debugger;
    this.notifications = this.alertService.subscribeToMessages();

  }
  // hubConnection: any;
  // socketData = [];
  // getSocketData() {
  //     console.log("MAP:SocketData Init");
  //     this.hubConnection = new HubConnectionBuilder()
  //         .withUrl('https://localhost:44380/message')
  //         .configureLogging(LogLevel.Information)
  //         .build();
  //     this.hubConnection.start()
  //         .then(() => console.log('Connection started!'))
  //         .catch(err => console.error('Error while establishing connection :('));
  //     this.hubConnection.on('BroadcastMessage', (data: any) => {
  //         this.socketData = JSON.parse(data);
  //         console.log("MAP:SocketData:", data);
  //         var notification = {
  //           'imei': this.socketData["IMEI"],
  //           'speed': this.socketData["Speed"],
  //           'fuel': this.socketData["Fuel"],
  //           'actual_date': this.socketData["ActualDate"],
  //           'message': ""
  //         }
  //         if (notification.speed > 150 && notification.fuel < 10 ) {
  //           notification.message = "Speed Crossed Limits and Low Fuel Level !!";
  //           this.notifications.push(notification);
  //         }
  //         else if (notification.fuel < 10 ){
  //           notification.message = "Low Fuel Level !!";
  //           this.notifications.push(notification);
  //         }
  //         else if(notification.speed > 150){
  //           notification.message = "Speed Crossed Limits !!";
  //           this.notifications.push(notification);
  //         }
  //         else
  //           console.log("within range")
  //           console.log("notifications array: ", this.notifications)
  //     });
  // }
}
