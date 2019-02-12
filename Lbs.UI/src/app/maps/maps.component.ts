import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { GoogleAPIService } from '../services/google-map.services'
// import { alertNotifierService } from '../services/alert-notifier.service'
import { ICoord, IVehicle, IMarkerMap } from '../interfaces/location';
import { interval } from 'rxjs'
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { AppConfig } from 'app/config/app.config';
// import { ToastrService } from 'ngx-toastr';


declare const google: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html'
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {


    constructor(private googleAPIService: GoogleAPIService) { }
 
    markerList: any[] = [];
    infowindow: any[] = [];
    imeiList = [];
    ngOnInit() {
        this.initMap();
        this.getSocketData();
    }
    ngOnChanges() {
        this.initMap();
        this.getSocketData();
    }
    ngOnDestroy() {
        console.log('Called Destroy');
    }

    map;
    lat_init: Number = 10.0118;
    lng_init: Number = 76.3664;

    zoom: Number = 12;

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
                    const mapOptions = {
                        zoom: this.zoom,
                        center: myLatlng,
                        scrollwheel: false,
                    };
                    try {
                        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                        // let markerElement = new google.maps.Marker({
                        //     position: myLatlng,
                        //     map: this.map,
                        //     icon: this.marker_icon_url_normal
                        // })
                        // console.log("dummy marker : ",markerElement)
                        // markerElement.setMap(this.map);
                    }
                    catch (E) {
                        this.map = null;
                        console.log('Reload')
                    }

                }
            );
    }
    hubConnection: any;
    socketData = [];
    getSocketData() {
        console.log("MAP:SocketData Init");
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(AppConfig.socket_url_notify)
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnection.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.error('Error while establishing connection :('));
        this.hubConnection.on('BroadcastMessage', (data: any) => {
            this.socketData = JSON.parse(data);
            console.log("MAP:SocketData:", data);
            let imei = this.socketData["IMEI"];
            //let mapper: IMarkerMap = { device: this.socketData["IMEI"], markerName: this.socketData["IMEI"] }
            let latlon: ICoord = { lat: this.socketData["Lat"], lng: this.socketData["Lon"] }
            this.updateMapData(imei, latlon);
        });
    }

    updateMapData(imei: string, latlon: ICoord) {
        console.log(imei,this.imeiList)
        if (this.imeiList.includes(imei)) {
            this.markerList.forEach(element => {
                console.log("IMEI::::::",element.device )
                if(element.device == imei){
                    element.marker.setPosition(new google.maps.LatLng(latlon.lng, latlon.lat))
                    element.marker.addListener('click', function () {
                        element.infowindow.open(this.map, element.marker);
                    });
                }
            });
        }
        else {
            let markerElement = new google.maps.Marker({
                position: new google.maps.LatLng(latlon.lng, latlon.lat),
                map: this.map,
                icon: this.marker_icon_url_normal,
                title : latlon.lat + '' + latlon.lng 
            })
            let infowindow = new google.maps.InfoWindow({
                content: '<div id="content">' +
                    '<b>Vehicle:' + imei + '</b>' +
                    '</div>'
            })
            let mappedMarker : IMarkerMap = {device:imei, marker:markerElement, infowindow: infowindow };
            this.markerList.push(mappedMarker);
            markerElement.setMap(this.map);
            markerElement.addListener('click', function () {
                infowindow.open(this.map, markerElement);
            });
            console.log("Marker Details:", this.markerList, latlon)
            this.imeiList.push(imei);
        }
        
    }
}
