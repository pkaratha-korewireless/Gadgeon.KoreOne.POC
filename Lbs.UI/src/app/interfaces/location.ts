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