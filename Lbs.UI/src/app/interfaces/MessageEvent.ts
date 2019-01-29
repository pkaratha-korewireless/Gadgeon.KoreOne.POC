import { Timestamp } from 'rxjs/Rx';

export interface MessageEvent {
   id: number;
   eventGuid: string;
   imei: string;
   speed: number;
   fuel: number;
   timestamp: Timestamp<string>;
   alert: string;
}
