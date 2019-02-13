// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class alertNotifierService {

//   private getsubject = new Subject<any>();
//   private sendsubject = new Subject<any>();

//   constructor() { }
//   sendMessage$ = this.sendsubject.asObservable();

//   getNotificationContent(msg: any) {
//     this.sendsubject.next(msg);
//   }
//   sendNotificationContent(msg: any) {
//     this.sendsubject.next(msg);
//   }



// }

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { INotifications } from 'app/interfaces/message';

@Injectable({
        providedIn: 'root'
})
export class alertNotifierService {

    private subject = new Subject<any>();
    public notifications: INotifications[] = [];


    constructor() { }

    getNotificationContent(): Observable<any> {
        this.subscribeToMessages();
        console.log("message subscribed in navbar")
        return this.subject.asObservable();
    }

    subscribeToMessages() {
      this.getSocketData();
    }

    
  hubConnection: any;
  socketData = [];
  getSocketData() {
      console.log("MAP:SocketData Init");
      this.hubConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:44380/message')
          .configureLogging(LogLevel.Information)
          .build();
      this.hubConnection.start()
          .then(() => console.log('Connection started!'))
          .catch(err => console.error('Error while establishing connection :('));
      this.hubConnection.on('BroadcastMessage', (data: any) => {
          this.socketData = JSON.parse(data);
          console.log("MAP:SocketData:", data);
          var notification = {
            'imei': this.socketData["IMEI"],
            'speed': this.socketData["Speed"],
            'fuel': this.socketData["Fuel"],
            'actual_date': this.socketData["ActualDate"],
            'message': ""
          }
          if (notification.speed > 150 && notification.fuel < 10 ) {
            notification.message = "Speed Crossed Limits and Low Fuel Level !!";
            this.notifications.push(notification);
          }
          else if (notification.fuel < 10 ){
            notification.message = "Low Fuel Level !!";
            this.notifications.push(notification);
          }
          else if(notification.speed > 150){
            notification.message = "Speed Crossed Limits !!";
            this.notifications.push(notification);
          }
          else
            console.log("within range")
            console.log("notifications array: ", this.notifications)
      });
  }


}



