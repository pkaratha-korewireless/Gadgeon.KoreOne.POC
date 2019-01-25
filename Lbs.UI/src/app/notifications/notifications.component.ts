import { Component, OnInit, Output } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { Apollo } from 'apollo-angular';
import { ApiSubscribeService } from 'app/services/api-subscribe.service';

const subQuery = gql`
subscription{
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
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Output() notifications: any;
  error: any;
  loading: boolean;
  private subSubscription: Subscription;

  constructor(private subApi: ApiSubscribeService) { }

  ngOnInit() {
    this.notifications = this.subApi.subscribe();
  }
}
