import { Component, OnInit, Output,OnDestroy ,ViewChild} from '@angular/core';
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


import { LiveBarchartServiceService } from '../services/live-barchart-service.service';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import {MatPaginator, MatTableDataSource} from '@angular/material';

Exporting(Highcharts);
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})


export class IconsComponent implements OnInit {
  public chart: any;

  speed: Number[] = [];
  options: Object;
  speedData: any;
  jsonobject: any;
  tupplejson: any;
  lessthan20count: number = 0;
  tuplelessthan20: any[] = [];
  lessthan40count: number = 0;
  tuplelessthan40: any[] = [];
  lessthan60count: number = 0;
  tupplelessthan60: any[] = [];
  lessthan90count: number = 0;
  tupplelessthan90: any[] = [];
  lessthan150count: number = 0;
  tupplelessthan150: any[] = [];
  morethan150count: number = 0;
  tupplemorethan150: any[] = [];
  tuppleAll: any[] = [];

  displayedColumns: string[] = ['device', 'speed'];
 
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  //@Output() dataSource: any;
  constructor(private livedata: LiveBarchartServiceService) {
    //this.dataSource.paginator = this.paginator;

    this.livedata.getJSON().subscribe(data => {
      this.speedData = data;
      for (var i = 0; i < this.speedData.length; i++) {
        if (this.speedData[i].speed <= 20) {
          this.lessthan20count++;
          let tu = [{ 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed }];
          this.tuplelessthan20.push(tu);
          this.tuppleAll.push(tu);
        }
        else if (this.speedData[i].speed > 20 && this.speedData[i].speed <= 40) {
          this.lessthan40count++;
          let tu = { 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed };
          this.tuplelessthan40.push(tu);
          this.tuppleAll.push(tu);
        }
        else if (this.speedData[i].speed > 40 && this.speedData[i].speed <= 60) {
          this.lessthan60count++;
          let tu = { 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed };
          this.tupplelessthan60.push(tu);
          this.tuppleAll.push(tu);
        }
        else if (this.speedData[i].speed > 60 && this.speedData[i].speed <= 90) {
          this.lessthan90count++;
          let tu = { 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed };
          this.tupplelessthan90.push(tu);
          this.tuppleAll.push(tu);
        }
        else if (this.speedData[i].speed > 90 && this.speedData[i].speed <= 150) {
          this.lessthan150count++;
          let tu = { 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed };
          this.tupplelessthan150.push(tu);
          this.tuppleAll.push(tu);
        }
        else {
          this.morethan150count++;
          let tu = [{ 'device': this.speedData[i].iMEI, 'speed': this.speedData[i].speed }];
          this.tupplemorethan150.push(tu);
          this.tuppleAll.push(tu);
        }
      }
      this.dataSource = new MatTableDataSource<any>(this.tuppleAll);
      this.dataSource.paginator = this.paginator;
      this.jsonobject = [{ 'name': 'lessthan20', 'y': this.lessthan20count }, { 'name': 'lessthan40', 'y': this.lessthan40count }, { 'name': 'lessthan40', 'y': this.lessthan40count },
      { 'name': 'lessthan60', 'y': this.lessthan60count }, { 'name': 'lessthan90', 'y': this.lessthan90count }, { 'name': 'lessthan150', 'y': this.lessthan150count }, { 'name': 'morethan150', 'y': this.morethan150count }];

      // this.tupplejson=[{'name':'Speed',id:'lessthan20','data':this.tuplelessthan20},
      // {'name':'Speed',id:'lessthan40','data':this.tuplelessthan40},
      // {'name':'Speed',id:'morethan40','data':this.tupplemorethan40}];
      // console.log(this.tuplelessthan40);
      var that = this;
      this.options = {

        title: { text: "Speed Analysis" },
        chart: {
          type: 'bar',
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }

          },
          bar: {
            events: {
              click: function (event) {
                that.onClick(event.point.category);               
              }
            }
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Speed range of vehicles'
          }
        },
        "series": [
          {
            "name": "Count",
            "colorByPoint": true,
            "data": this.jsonobject
          }
        ]

      }

    });
  }

  onClick(x) {
    var index = x;
    switch (index) {
      case 0: {
        this.dataSource = new MatTableDataSource<any>(this.tuplelessthan20);
        break;
      }
      case 1: {
        this.dataSource = new MatTableDataSource<any>(this.tuplelessthan40);
        break;
      }
      case 2: {
        this.dataSource = new MatTableDataSource<any>(this.tupplelessthan60);
        break;
      }
      case 3: {
        this.dataSource = new MatTableDataSource<any>(this.tupplelessthan90);
        break;
      }
      case 4: {
        this.dataSource = new MatTableDataSource<any>(this.tupplelessthan150);
        break;
      }
      default: {
        this.dataSource = new MatTableDataSource<any>(this.tupplemorethan150);
        break;
      }
    }
    this.dataSource.paginator = this.paginator;
  }
}
