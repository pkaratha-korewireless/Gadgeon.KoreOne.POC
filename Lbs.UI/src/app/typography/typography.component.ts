import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kibana-dashboard',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  yt='<iframe src="http://localhost:5601/app/kibana#/dashboard/dc0bad90-1f48-11e9-9fe7-41044522f366?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-5y%2Cmode%3Aquick%2Cto%3Anow))" height="500" width="1000"></iframe>';

}
