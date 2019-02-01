import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { Apollo } from 'apollo-angular';

const getQuery = gql`
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

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit, OnDestroy {

  @Output() allMessages: any;
  error: any;
  loading: boolean;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: getQuery
    }).valueChanges.subscribe(result => {
      console.log(result);
      this.error = result.errors;
      this.loading = result.loading;
      this.allMessages = result.data && result.data.get_elastic_data;
    })
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
