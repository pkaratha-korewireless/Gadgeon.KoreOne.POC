import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';
import gql from 'graphql-tag';
import { AlertService } from './services/alert.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const subscription = gql`
subscription alerts{
  new_message{
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
  private message: any;

  constructor(private apollo: Apollo, private alertService: AlertService) { }

  ngOnInit() {
    this.subSubscription = this.apollo
      .subscribe({
        query: subscription
      })
      .subscribe(result => {
        console.log(result);
        this.message = result.data.new_message;
        this.alertService.device_messages.push(this.message);
        if (this.message.speed > 50 || this.message.fuel < 3) {
          this.alertService.notifications.push(this.message);
        }
      });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }
}
