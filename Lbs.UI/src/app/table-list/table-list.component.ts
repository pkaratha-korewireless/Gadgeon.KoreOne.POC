import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Message } from '../interfaces/message'
import { Observable } from 'rxjs';
import { ApiGetService } from 'app/services/api-get.service';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';
import { timingSafeEqual } from 'crypto';

const getQuery = gql`
query allMessages($imei: String!) {
  get_cassandra_data(imei: $imei) {
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
export class TableListComponent implements OnInit{

  @Output() allMessages: any;
  error: any;
  loading: boolean;
  public querySubscription: Subscription;
  selectedImei: string;
  buttonLabel: string = 'Vehicle 3';
  
  vehicles: any[] = [
  {name: 'Vehicle 3', imei:'000013612345680'}, {name: 'Vehicle 4', imei:'000013612345681'}, 
  {name: 'Vehicle 5', imei:'000013612345682'}, {name: 'Vehicle 6', imei:'000013612345683'}, 
  {name: 'Vehicle 7', imei:'000013612345684'}, {name: 'Vehicle 8', imei:'000013612345685'}];

  constructor(private apollo: Apollo, private apiGetService: ApiGetService) { }

  ngOnInit() {

    this.selectedImei = this.vehicles[0];
    this.getMessages(this.selectedImei);
    console.log("after get messages");
    
  }

  changedata($event)
   {
     console.log($event);
      this.getMessages($event.target.value);
   }

  getMessages(selectedVehicle: any) {
    
    this.buttonLabel = selectedVehicle.name;
    console.log("get messages method");
    this.querySubscription = this.apollo.watchQuery<any>({
      query: getQuery,
      variables: {
        imei: selectedVehicle.imei,
      },
    }).valueChanges.subscribe(result => {
      console.log("cassandra data : " + result);
      this.error = result.errors;
      this.loading = result.loading;
      this.allMessages = result.data && result.data.get_cassandra_data;
    });
  }

}
