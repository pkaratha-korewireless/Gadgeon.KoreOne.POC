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

  constructor(private apollo: Apollo, private apiGetService: ApiGetService) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: getQuery
    }).valueChanges.subscribe(result => {
      console.log(result);
      this.error = result.errors;
      this.loading = result.loading;
      this.allMessages = result.data && result.data.get_cassandra_data;
    })

    // TO DO:  use ApiGetService to get messages instead of directly using api in the component

    // this.apiGetService
    //     .getCassandraData()
    //     .subscribe(messages => {
    //       console.log(messages);
    //       this.allMessages = messages;
    //     }
    //   );
    // console.log(this.allMessages);
    // this.getMessages();
    // console.log(this.allMessages);
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  getMessages() {
    const result = this.apiGetService.getCassandraData().subscribe(messages => {
      this.allMessages = messages;
    });
  }

}
