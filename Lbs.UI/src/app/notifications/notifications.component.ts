import { Component, OnInit, Output, OnDestroy, forwardRef } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { Apollo } from 'apollo-angular';
import { AlertService } from 'app/services/alert.service';

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
  @Output() notifications: Array<any> = [];
  // error: any;
  // loading: boolean;
  // private subSubscription: Subscription;

  constructor(private alertService: AlertService) { }

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
    this.notifications = this.alertService.notifications;
  }

  // ngOnDestroy() {
  //   this.subSubscription.unsubscribe();
  // }
}
