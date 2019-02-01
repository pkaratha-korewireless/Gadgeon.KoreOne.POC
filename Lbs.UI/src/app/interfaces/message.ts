import { Timestamp } from 'rxjs/Rx';

export interface Message {
    id: string;
    imei: string;
    actual_date: Timestamp<string>;
    latitude: number;
    longitude: number;
    direction: number;
    odometer: number;
    speed: number;
    analog: number;
    eventcode: number;
    textm: number;
    fuel: number;
    temp2: number;
    voltage: number;
}
