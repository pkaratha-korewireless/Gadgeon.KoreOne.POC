import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
public notifications: Array<any> = [];
constructor() { }

}
