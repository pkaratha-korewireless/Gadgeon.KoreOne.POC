import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Message } from 'app/interfaces/message';
import { Subscription } from 'apollo-client/util/Observable';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';

const cqry = gql`
  query allMessages {
    get_cassandra_data {
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
      }
      `;

const eqry = gql`
query allMessages {
  get_elastic_data {
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
}
`;
@Injectable({
  providedIn: 'root'
})
export class ApiGetService {
  cassandraMessages: Observable<any>;
  elasticMessages: any;
  error: any;
  loading: boolean;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {

  }
  public getCassandraData(): Observable<any> {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: cqry
    }).valueChanges.subscribe(result => {
      console.log(result);
      this.error = result.errors;
      this.loading = result.loading;
      this.cassandraMessages =  result.data && result.data.get_cassandra_data;
      console.log(this.cassandraMessages);
    })
    return this.cassandraMessages;
  }

  public getElasticData(): Observable<any> {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: eqry
    }).valueChanges.subscribe(result => {
      console.log(result);
      this.error = result.errors;
      this.loading = result.loading;
      return result.data && result.data.get_elastic_data;
    })
    return this.elasticMessages;
  }
}
