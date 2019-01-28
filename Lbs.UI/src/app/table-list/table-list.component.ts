import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Message } from '../interfaces/message'
import { Observable } from 'rxjs';
import { ApiGetService } from 'app/services/api-get.service';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';

const getQuery = gql`
query allMessages {
  get {
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
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy {

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
      this.allMessages = result.data && result.data.get;
    })
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
