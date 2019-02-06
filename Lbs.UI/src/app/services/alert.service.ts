import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
public notifications: Array<any> = [];
public device_messages: Array<any> = [];
public alerts: Array<any> = [];
// public messageLen: any;
constructor() { }

}
