import { Injectable } from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import { Message } from 'app/interfaces/message';

export interface Response {
  allMessages: Message[];
}
@Injectable({
  providedIn: 'root'
})
export class ApiGetService extends Query<Response> {
      document = gql`
      query allMessages {
        get {
          id
          iMEI
          actualDate
          latitude
          longitude
          direction
          odometer
          speed
          analog
          eventCode
          textM
          fuel
          temp2
          voltage
        }
      }
      `;
}
