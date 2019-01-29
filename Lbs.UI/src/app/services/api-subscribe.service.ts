import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ApiSubscribeService extends Subscription {
  document = gql`
subscription {
  limitExceeded {
    id
    imei
    alert
    eventGuid
    fuel
    speed
    timestamp
  }
}`;
}
