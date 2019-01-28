import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';
import gql from 'graphql-tag';
import { AlertService } from './services/alert.service';

const subscription = gql`
subscription alerts{
  limitExceeded{
    id
    imei
    alert
    eventGuid
    fuel
    speed
    timestamp
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subSubscription: Subscription;

  constructor(private apollo: Apollo, private alertService: AlertService) { }

  ngOnInit() {
    this.subSubscription = this.apollo
      .subscribe({
        query: subscription
      })
      .subscribe(result => {
        console.log(result);
        this.alertService.notifications.push(result.data.limitExceeded);
        // tslint:disable-next-line:no-debugger
        // debugger;
      });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }
}
