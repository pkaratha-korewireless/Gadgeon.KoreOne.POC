import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';
import gql from 'graphql-tag';
import { AlertService } from './services/alert.service';
import { IMessageData } from './interfaces/message';
import * as moment from 'moment';

//let now = moment().fromNow();

const subscription = gql`
subscription alerts{
  limitExceeded{
    id
    imei
    actual_date
    latitude
    longitude
    direction
    odometer
    speed
    temperature
    fuel
    voltage
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subSubscription: Subscription;
  // private message: any;
  private message: any;
  messageData = { } as IMessageData;

  constructor(private apollo: Apollo, private alertService: AlertService) { }

  ngOnInit() {
    this.subSubscription = this.apollo
      .subscribe({
        query: subscription
      })
      .subscribe(result => {
        console.log(result);
        this.message = result.data.limitExceeded;
        this.alertService.device_messages.push(this.message);

        if (this.message.speed > 150 || this.message.fuel < 10) {
          this.alertService.notifications.push(this.message);
          this.messageData.text = this.message.imei + ": Limit Exceeded, Speed: "+ this.message.speed + " Fuel: "+this.message.fuel ;
          this.messageData.date = moment(this.message.actual_date).fromNow();;
          debugger;
          console.log("Message Data", this.messageData)
          this.alertService.alerts.push(this.messageData);
        }
        // tslint:disable-next-line:no-debugger
        // debugger;
      });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }
}
