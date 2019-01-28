import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
        providedIn: 'root'
})
export class alertNotifierService {

    private subject = new Subject<any>();

    constructor() { }

    getNotificationContent(): Observable<any> {
        return this.subject.asObservable();
    }

    sendNotificationContent(message: string) {
        this.subject.next({ text: message });
    }

    clearNotificationContent() {
        this.subject.next();
    }


}

