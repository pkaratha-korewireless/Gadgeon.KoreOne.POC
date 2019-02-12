import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config/app.config';


@Component({
  selector: 'kibana-dashboard',
  templateUrl: './kibanadashboard.component.html',
  styleUrls: ['./kibanadashboard.component.css']
})
export class KibanadashboardComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }
  
  kibana_dashboard='<iframe src='+AppConfig.kibana_url+' height="600" width="1000"></iframe>';
 // kibana_dashboard='<iframe src="http://192.168.65.178:5601/app/kibana#/dashboard/da7fd4e0-2dd7-11e9-a509-df90251aacd3?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-30m%2Cmode%3Arelative%2Cto%3Anow-13s))" height="600" width="1000"></iframe>'
  }
