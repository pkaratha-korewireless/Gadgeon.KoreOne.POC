export interface ILocation
{
    iMEI: Number,
    location: ICoord[],
    direction: Number,
    speed: Number,
    fuel: Number
}

export interface ICoord{
    lat: Number,
    lng: Number
}

export interface ISpeed{
    device:any;
    speed:number;

}