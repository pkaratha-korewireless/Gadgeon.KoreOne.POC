import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { GoogleAPIService } from '../services/google-map.services'
import { alertNotifierService } from '../services/alert-notifier.service'
import { ICoord, IVehicle } from '../interfaces/location';
import { interval } from 'rxjs'
import { ToastrService } from 'ngx-toastr';


declare const google: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html'
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {


    constructor(private googleAPIService: GoogleAPIService, private toastr: ToastrService,
        private notifierService: alertNotifierService) {

    }
    ngOnInit() {
        this.initMap();
    }
    ngOnChanges() {
        this.initMap();
    }
    ngOnDestroy() {
        console.log('Called Destroy');
    }

    public showErrorNotification(message: string, iMEI: Number): void {
        message = "Vehicle " + iMEI + ": " + message;
        this.notifierService.sendNotificationContent(message);
    }
    // public showWarningNotification(message: string, iMEI: Number ): void {
    //     message = "Vehicle "+iMEI+": " + message;
    //     debugger;
    //     this.notifierService.sendNotificationContent(message);       
    //     this.toastr.warning(message, 'Alert!!', {
    //         timeOut: 3000
    //       });
    // }

    CheckSpeedLimit(vehicle: IVehicle) {
        var flag = false;
        if (vehicle.speed > this.maxSpeed) {
            console.log("Speed Crossed Limits")
            flag = true;
            this.showErrorNotification('Speed Crossed Limits', vehicle.iMEI)
        }
        else
            flag = false;
        return flag;
    }

    CheckFuelLevel(vehicle: IVehicle) {
        var flag = false;
        if (vehicle.fuel < this.minFuelLevel) {
            console.log("Fuel Level Low")
            flag = true;
            this.showErrorNotification('Fuel Level Extremely Low', vehicle.iMEI)
        }
        else
            flag = false;
        return flag;
    }

    getDirection() {
        this.origin = { lat: 10.011848, lng: 76.366421 }
        this.destination = { lat: 10.019524, lng: 76.367017 }
    }

    map;
    coords: ICoord[] = [];
    vehicles: IVehicle[] = [];
    lat_init: Number = 10.0118;
    lng_init: Number = 76.3664;

    zoom: Number = 11;

    marker_icon_url_normal: string = "./assets/img/car_icon_normal.png"
    marker_icon_url_error: string = "./assets/img/car_icon_red.png"


    minFuelLevel: Number = 20;
    maxSpeed: Number = 100;

    polyLine: any[] = [];

    origin: any
    destination: any
    contentString: any[] = [];


    initFlag = false;
    initMap() {
        this.googleAPIService.googleReady()
            .subscribe(
                null,
                err => console.log(err),
                () => {

                    var myLatlng = new google.maps.LatLng(this.lat_init, this.lng_init);

                    // var newDir = new google.maps.DirectionsService();
                    // newDir.
                    const mapOptions = {
                        zoom: this.zoom,
                        center: myLatlng,
                        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page

                        styles: [
                            { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
                            {
                                'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
                                { 'saturation': -100 }, { 'lightness': 99 }]
                            },
                            {
                                'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
                                { 'lightness': 54 }]
                            },
                            { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
                            { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
                            { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
                            { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
                            { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
                            {
                                'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
                                { 'color': '#b8cb93' }]
                            },
                            { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
                            { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
                            { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
                            { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
                        ]
                    };
                    try {
                        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);


                        this.googleAPIService.getLocations().subscribe(
                            vehicleData => {
                                //length = Object.keys(vehicleData).length
                                vehicleData.forEach(vehicle => {
                                    this.vehicles.push(vehicle);
                                });

                            }
                        );
                        let marker: any[] = [];
                        let infowindow: any[] = [];
                        interval(2000).subscribe(a => {
                            this.googleAPIService.getLocations().subscribe(
                                vehicleUpdates => {
                                    if (!this.initFlag) {
                                        for (let i = 0; i < vehicleUpdates.length; i++) {
                                            marker.push(new google.maps.Marker({
                                                position: new google.maps.LatLng(vehicleUpdates[i].location[0].lat, vehicleUpdates[i].location[0].lng),
                                                map: this.map,
                                                icon: this.marker_icon_url_normal
                                            }))

                                            infowindow.push(new google.maps.InfoWindow({
                                                content: '<div id="content">' +
                                                    '<b>Vehicle:' + this.vehicles[i].iMEI + '</b>' +
                                                    '<p>Fuel:' + this.vehicles[i].fuel + '</p>' +
                                                    '<p>Speed:' + this.vehicles[i].speed + '</p>' +
                                                    '</div>'
                                            }));

                                            marker[i].addListener('click', function () {
                                                infowindow[i].open(this.map, marker[i]);
                                            });
                                        }

                                    }
                                    this.initFlag = true;

                                    for (let i = 0; i < vehicleUpdates.length; i++) {
                                        this.vehicles[i].fuel = vehicleUpdates[i].fuel
                                        this.vehicles[i].iMEI = vehicleUpdates[i].iMEI
                                        this.vehicles[i].speed = vehicleUpdates[i].speed

                                        vehicleUpdates[i].location.forEach(coordinate => {
                                            this.vehicles[i].location.push(coordinate)
                                        });
                                        var flightPath = new google.maps.Polyline({
                                            path: this.vehicles[i].location,
                                            geodesic: true,
                                            strokeColor: '#333333',
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2
                                        });
                                        this.polyLine.push(flightPath);

                                        this.polyLine.forEach(path => {
                                            path.setMap(this.map);
                                        });
                                        console.log(marker[i])
                                        myLatlng = new google.maps.LatLng(this.vehicles[i].location[this.vehicles[i].location.length - 1].lat, this.vehicles[i].location[this.vehicles[i].location.length - 1].lng);
                                        marker[i].setPosition(myLatlng)

                                        var isSpeedError = this.CheckSpeedLimit(this.vehicles[i]);
                                        var isFuelError = this.CheckFuelLevel(this.vehicles[i]);
                                        // if (isError) {
                                        //     marker[i].icon = this.marker_icon_url_error;
                                        //     marker[i].setPosition(myLatlng)
                                        // }
                                        // else{
                                        //     marker[i].icon = this.marker_icon_url_normal;

                                        //     marker[i].setPosition(myLatlng)

                                        // }

                                        //debugger;
                                        //marker[0].icon = this.marker_icon_url_error;

                                        this.contentString[i] = '<div id="content">' +
                                            '<p><b>Vehicle:' + this.vehicles[i].iMEI + '</b></p>' +
                                            '<p><b>Fuel:</b>' + this.vehicles[i].fuel + '</p>' +
                                            '<p><b>Speed:</b>' + this.vehicles[i].speed + '</p>' +
                                            '</div>';

                                        infowindow[i] = new google.maps.InfoWindow({
                                            content: this.contentString[i]
                                        });

                                    }
                                });
                        });

                    }
                    catch (E) {
                        this.map = null;
                        console.log('Reload')
                    }

                }
            );
    }

}
