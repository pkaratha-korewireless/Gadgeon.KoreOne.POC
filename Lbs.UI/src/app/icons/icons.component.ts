// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-icons',
//   templateUrl: './icons.component.html',
//   styleUrls: ['./icons.component.css']
// })
// export class IconsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }





import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  OnInit,
  NgModule
} from '@angular/core';
import { LiveBarchartServiceService } from '../services/live-barchart-service.service';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';

import {ISpeed} from '../interfaces/location';
// Initialize exporting module.
Exporting(Highcharts);
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})

@NgModule({
	imports: [
	
		ChartModule,
		
	],
})

// export interface DeviceSpeed {
//   id: number;
//   device: any;
//   speed: number;

// }


export class IconsComponent {
  //@ViewChild('charts') public chartEl: ElementRef;
  public chart: any;  

    speed: Number[] = [];
    options:Object;
    people:any;
    jsonobject:any;
    tupplejson:any;
    lessthan20count:number=0;
    
  tuplelessthan20:any[]=[];
  lessthan40count:number=0;
  tuplelessthan40:any[]=[];
  morethan40count:number=0;
  tupplemorethan40:any[]=[];
  displayedColumns: string[] = ['device', 'speed'];
  dataSource :ISpeed[]=[];




 
  constructor(private livedata: LiveBarchartServiceService, private changeDetectionRef: ChangeDetectorRef) {

    
    this.livedata.getJSON().subscribe(data => {

      this.people = this.sortByKey(data, 'speed');  
  for(var i=0;i<this.people.length;i++){
  
  
          if(this.people[i].speed<=20){
          this.lessthan20count++;
          let tu=[{'device':this.people[i].iMEI,'speed':this.people[i].speed}];
          this.tuplelessthan20.push(tu);
          
          }
          else if(this.people[i].speed>20 && this.people[i].speed<=40){
          this.lessthan40count++;
          let tu=[{'device':this.people[i].iMEI,'speed':this.people[i].speed}];
          this.tuplelessthan40.push(tu);
          }
          else{
          this.morethan40count++;
          let tu=[{'device':this.people[i].iMEI,'speed':this.people[i].speed}];
          this.tupplemorethan40.push(tu);
          }
  
  }
  this.dataSource=this.tuplelessthan40;
  
  // ,'drilldown':'lessthan20'
  // ,'drilldown':'lessthan40'
  // ,'drilldown':'morethan40'
  this.jsonobject = [{'name':'lessthan20', 'y':this.lessthan20count,'drilldown':'lessthan20'},{'name':'lessthan40', 'y':this.lessthan40count,'drilldown':'lessthan40'},{'name':'morethan40', 'y':this.morethan40count,'drilldown':'morethan40'}];
  
  this.tupplejson=[{'name':'Speed',id:'lessthan20','data':this.tuplelessthan20},
  {'name':'Speed',id:'lessthan40','data':this.tuplelessthan40},
  {'name':'Speed',id:'morethan40','data':this.tupplemorethan40}];
  console.log(this.tuplelessthan40);
  var that=this;
  this.options={
    
    title:{text:"Speed Analysis"},
    chart:{ type: 'bar',
    zoomType: 'x',
    panning: true,
    panKey: 'shift'}, 
   
    plotOptions: {
      series:{
        // events:{
        //   click:function(event){
        //     debugger;
        //     console.log(event);
        //   }
        // },
        dataLabels: {
          enabled: true,
          format: '{point.y}'
      }
     
      },
      bar: {
        events: {
           click:function(event) {
            // if(event.point.category==1){
that.onClick(1);
              //(event.point.category);
               //this.dataSource=this.tuplelessthan40;
              // debugger;
            // }
           //  debugger;
               console.log(event.point.category);
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
        // [
        //     {
        //         "name": "<20",
        //         "y": 62.74,
        //         "drilldown": "Chrome"
        //     },
        //     {
        //         "name": "21-40",
        //         "y": 10.57,
        //         "drilldown": "Firefox"
        //     },
        //     {
        //         "name": "41-60",
        //         "y": 7.23,
        //         "drilldown": "Internet Explorer"
        //     },
        //     {
        //         "name": "61-90",
        //         "y": 5.58,
        //         "drilldown": "Safari"
        //     },
        //     {
        //         "name": "91-120",
        //         "y": 4.02,
        //         "drilldown": "Edge"
        //     },
        //     {
        //         "name": "121-150",
        //         "y": 1.92,
        //         "drilldown": "Opera"
        //     },
        //     {
        //         "name": ">150",
        //         "y": 7.62,
        //         "drilldown": null
        //     }
        // ]
    }
]
//  ,
// "drilldown": {
//   "series":this.tupplejson
// }
//   //   "series": 
//   //   [
//   //       {
//   //           "name": "Chrome",
//   //           "id": "Chrome",
//   //           "data": [
//   //               [
//   //                   "v65.0",
//   //                   0.1
//   //               ],
//   //               [
//   //                   "v64.0",
//   //                   1.3
//   //               ],
//   //               [
//   //                   "v63.0",
//   //                   53.02
//   //               ],
//   //               [
//   //                   "v62.0",
//   //                   1.4
//   //               ],
//   //               [
//   //                   "v61.0",
//   //                   0.88
//   //               ],
//   //               [
//   //                   "v60.0",
//   //                   0.56
//   //               ],
//   //               [
//   //                   "v59.0",
//   //                   0.45
//   //               ],
//   //               [
//   //                   "v58.0",
//   //                   0.49
//   //               ],
//   //               [
//   //                   "v57.0",
//   //                   0.32
//   //               ],
//   //               [
//   //                   "v56.0",
//   //                   0.29
//   //               ],
//   //               [
//   //                   "v55.0",
//   //                   0.79
//   //               ],
//   //               [
//   //                   "v54.0",
//   //                   0.18
//   //               ],
//   //               [
//   //                   "v51.0",
//   //                   0.13
//   //               ],
//   //               [
//   //                   "v49.0",
//   //                   2.16
//   //               ],
//   //               [
//   //                   "v48.0",
//   //                   0.13
//   //               ],
//   //               [
//   //                   "v47.0",
//   //                   0.11
//   //               ],
//   //               [
//   //                   "v43.0",
//   //                   0.17
//   //               ],
//   //               [
//   //                   "v29.0",
//   //                   0.26
//   //               ]
//   //           ]
//   //       },
//   //       {
//   //           "name": "Firefox",
//   //           "id": "Firefox",
//   //           "data": [
//   //               [
//   //                   "v58.0",
//   //                   1.02
//   //               ],
//   //               [
//   //                   "v57.0",
//   //                   7.36
//   //               ],
//   //               [
//   //                   "v56.0",
//   //                   0.35
//   //               ],
//   //               [
//   //                   "v55.0",
//   //                   0.11
//   //               ],
//   //               [
//   //                   "v54.0",
//   //                   0.1
//   //               ],
//   //               [
//   //                   "v52.0",
//   //                   0.95
//   //               ],
//   //               [
//   //                   "v51.0",
//   //                   0.15
//   //               ],
//   //               [
//   //                   "v50.0",
//   //                   0.1
//   //               ],
//   //               [
//   //                   "v48.0",
//   //                   0.31
//   //               ],
//   //               [
//   //                   "v47.0",
//   //                   0.12
//   //               ]
//   //           ]
//   //       },
//   //       {
//   //           "name": "Internet Explorer",
//   //           "id": "Internet Explorer",
//   //           "data": [
//   //               [
//   //                   "v11.0",
//   //                   6.2
//   //               ],
//   //               [
//   //                   "v10.0",
//   //                   0.29
//   //               ],
//   //               [
//   //                   "v9.0",
//   //                   0.27
//   //               ],
//   //               [
//   //                   "v8.0",
//   //                   0.47
//   //               ]
//   //           ]
//   //       },
//   //       {
//   //           "name": "Safari",
//   //           "id": "Safari",
//   //           "data": [
//   //               [
//   //                   "v11.0",
//   //                   3.39
//   //               ],
//   //               [
//   //                   "v10.1",
//   //                   0.96
//   //               ],
//   //               [
//   //                   "v10.0",
//   //                   0.36
//   //               ],
//   //               [
//   //                   "v9.1",
//   //                   0.54
//   //               ],
//   //               [
//   //                   "v9.0",
//   //                   0.13
//   //               ],
//   //               [
//   //                   "v5.1",
//   //                   0.2
//   //               ]
//   //           ]
//   //       },
//   //       {
//   //           "name": "Edge",
//   //           "id": "Edge",
//   //           "data": [
//   //               [
//   //                   "v16",
//   //                   2.6
//   //               ],
//   //               [
//   //                   "v15",
//   //                   0.92
//   //               ],
//   //               [
//   //                   "v14",
//   //                   0.4
//   //               ],
//   //               [
//   //                   "v13",
//   //                   0.1
//   //               ]
//   //           ]
//   //       },
//   //       {
//   //           "name": "Opera",
//   //           "id": "Opera",
//   //           "data": [
//   //               [
//   //                   "v50.0",
//   //                   0.96
//   //               ],
//   //               [
//   //                   "v49.0",
//   //                   0.82
//   //               ],
//   //               [
//   //                   "v12.1",
//   //                   0.14
//   //               ]
//   //           ]
//   //       }
//   //   ]
//   //  // series:[ {name: 'Speed',data:usdeur}]
//   }
  
 

  

}

             });
  
  
  
   
            }
  sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
onClick(x) {
  
  if(x==1){
    this.dataSource=this.tuplelessthan40;

    debugger;

  }
  
}
  
 
}
