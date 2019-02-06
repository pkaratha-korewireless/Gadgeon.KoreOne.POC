import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
        providedIn: 'root'
})
export class alertNotifierService {

    private getsubject = new Subject<any>();
    private sendsubject = new Subject<any>();

    constructor() { }   
    sendMessage$=this.sendsubject.asObservable();

    getNotificationContent(msg: any) {
        this.sendsubject.next(msg);
      }
    sendNotificationContent(msg: any) {
        this.sendsubject.next(msg);
      }
    


}

