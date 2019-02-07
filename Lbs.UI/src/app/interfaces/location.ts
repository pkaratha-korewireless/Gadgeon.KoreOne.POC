import { interceptingHandler } from "@angular/common/http/src/module";

export interface IVehicle
{
    iMEI: Number,
    location: ICoord[],
    speed: Number,
    fuel: Number,
}

export interface ICoord{
    lat: Number,
    lng: Number
}

export interface ISpeed{
    device:any;
    speed:number;

}

export interface IMarkerMap{
    device:string;
    marker: any;
}