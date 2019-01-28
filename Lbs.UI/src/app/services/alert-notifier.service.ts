import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
        providedIn: 'root'
})
export class alertNotifierService {

    private subject = new Subject<any>();

    constructor() { }

    getNotificationContent(): Observable<any> {
        console.log("message subscribed in navbar")
        return this.subject.asObservable();
    }

    sendNotificationContent(message: string) {
        console.log("message input received");
        this.subject.next({ text: message });
        console.log(this.subject);
        debugger;
    }

    clearNotificationContent() {
        this.subject.next();
    }


}

