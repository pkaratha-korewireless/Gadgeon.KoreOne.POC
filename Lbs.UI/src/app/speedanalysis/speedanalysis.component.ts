import { Component, OnInit,ViewChild} from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import * as signalR from "@aspnet/signalr";
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AppConfig } from 'app/config/app.config';
import {LiveDataService} from '../services/livedata.service';
Exporting(Highcharts);


@Component({
  selector: 'speed-analysis',
  templateUrl: './speedanalysis.component.html',
  styleUrls: ['./speedanalysis.component.css']
})


export class SpeedanalysisComponet implements OnInit {

  allMessages: any;
  error: any;
  loading: boolean;
  public chart: any;
  speed: Number[] = [];
 
 
  //testdata:any=[];
  speedData:any=[];


  jsonobject: any;
  
  jsonobjecttest :any;
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
  private hubConnection: signalR.HubConnection;
  testdata = [  
    {  
        "IMEI":"000013612345680",
        "Speed":0
     },
    {  
       "IMEI":"000013612345681",
       "Speed":0
    },
    {  
       "IMEI":"000013612345682",
       "Speed":0
    },
    {  
        "IMEI":"000013612345683",
        "Speed":0
     },
     {  
        "IMEI":"000013612345684",
        "Speed":0
     },
     {  
        "IMEI":"000013612345685",
        "Speed":0
     },
     {  
        "IMEI":"000013612345686",
        "Speed":0
     },
     {  
         "IMEI":"000013612345687",
         "Speed":0
      },
      {  
         "IMEI":"000013612345688",
         "Speed":0
      },
      {  
         "IMEI":"000013612345689",
         "Speed":0
      }
 ]
 options:object;

  constructor(private livedata:LiveDataService) { 
    this.jsonobjecttest = [{ 'name': 'lessthan20', 'y': 10 }, { 'name': 'lessthan40', 'y': 0 }, { 'name': 'lessthan40', 'y': 0 },
  { 'name': 'lessthan60', 'y': 0}, { 'name': 'lessthan90', 'y': 0 }, { 'name': 'lessthan150', 'y': 0 }, { 'name': 'morethan150', 'y': 0 }];

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
          "data": this.jsonobjecttest
        }
      ]   
     
    }

  }

 
  ngOnInit() {

    this.dataSource.paginator = this.paginator;    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(AppConfig.socket_url_speedanalysis)
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection.start()
      .then(() => console.log('Connection started!'));          
      this.hubConnection.on('BroadcastMessage', (data: any) => {              
        let speedData=JSON.parse(data);
        console.log("SpeedAnalysis", speedData)
    
          this.testdata.forEach(function(item) {
            if (item.IMEI === speedData.IMEI) {
              item.Speed = speedData.Speed
            }
          });
        
        this.drawChart();
      
       
    });
  }

  drawChart(){
    this.tuplelessthan20=[];
    this.tuplelessthan40=[];
    this.tupplelessthan60=[];
    this.tupplelessthan90=[];
    this.tupplelessthan150=[];
    this.tupplemorethan150=[];
    this.lessthan20count=0;
    this.lessthan40count=0;
    this.lessthan60count=0;
    this.lessthan90count=0;
    this.lessthan150count=0;
    this.morethan150count=0;

    for (var i = 0; i < this.testdata.length; i++) {
       let parsedData = this.testdata;
      if (parsedData[i].Speed <= 20) {
        this.lessthan20count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tuplelessthan20.push(tu);
        this.tuppleAll.push(tu);
      }
      else if (parsedData[i].Speed > 20 && parsedData[i].Speed <= 40) {
        this.lessthan40count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tuplelessthan40.push(tu);
        this.tuppleAll.push(tu);
      }
      else if (parsedData[i].Speed > 40 && parsedData[i].Speed <= 60) {
        this.lessthan60count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tupplelessthan60.push(tu);
        this.tuppleAll.push(tu);
      }
      else if (parsedData[i].Speed > 60 && parsedData[i].Speed <= 90) {
        this.lessthan90count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tupplelessthan90.push(tu);
        this.tuppleAll.push(tu);
      }
      else if (parsedData[i].Speed > 90 && parsedData[i].Speed <= 150) {
        this.lessthan150count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tupplelessthan150.push(tu);
        this.tuppleAll.push(tu);
      }
      else {
        this.morethan150count++;
        let tu = { 'device': parsedData[i].IMEI, 'speed': parsedData[i].Speed };
        this.tupplemorethan150.push(tu);
        this.tuppleAll.push(tu);
      }
    }
    this.dataSource = new MatTableDataSource<any>(this.tuppleAll);
    this.dataSource.paginator = this.paginator;
    this.jsonobject = [{ 'name': 'lessthan20', 'y': this.lessthan20count }, { 'name': 'lessthan40', 'y': this.lessthan40count }, { 'name': 'lessthan40', 'y': this.lessthan40count },
    { 'name': 'lessthan60', 'y': this.lessthan60count }, { 'name': 'lessthan90', 'y': this.lessthan90count }, { 'name': 'lessthan150', 'y': this.lessthan150count }, { 'name': 'morethan150', 'y': this.morethan150count }];

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
          animation:false,
          
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