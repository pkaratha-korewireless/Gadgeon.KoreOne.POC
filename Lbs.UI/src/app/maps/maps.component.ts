import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { GoogleAPIService } from '../services/google-map.services'
import { ICoord, ILocation } from '../interfaces/location';
import { interval } from 'rxjs'

declare const google: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html'
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {

    constructor(private googleAPIService: GoogleAPIService) { }
    ngOnInit() {
        this.initMap();
    }
    ngOnChanges() {
        this.initMap();
    }
    ngOnDestroy() {
        console.log('Called Destroy');
    }
    map;
    coords: ICoord[] = [{
        'lat': 10.0118,
        'lng': 76.3664
    }];
    lat: Number[];
    lng: Number[];
    lat_init: Number = 10.0118;
    lng_init: Number = 76.3664;
    zoom: Number = 14;
    initMap() {
        this.googleAPIService.googleReady()
            .subscribe(
                null,
                err => console.log(err),
                () => {

                    var myLatlng = new google.maps.LatLng(this.lat_init, this.lng_init);
                    const mapOptions = {
                        zoom: 15,
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
                        let marker;
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(this.lat_init, this.lng_init),
                            map: this.map,
                            icon: "./assets/img/car_icon.png"
                        });
                        interval(2000).subscribe(a => {
                            this.googleAPIService.getLocations().subscribe(
                                result => {
                                    result.location.forEach(item => {
                                        this.coords.push(result.location[0]);
                                        this.lat_init = result.location[0].lat;
                                        this.lng_init = result.location[0].lng;
                                        myLatlng = new google.maps.LatLng(this.lat_init, this.lng_init);
                                    });
                                });
                            var flightPath = new google.maps.Polyline({
                                path: this.coords,
                                geodesic: true,
                                strokeColor: '#FF0000',
                                strokeOpacity: 1.0,
                                strokeWeight: 2
                            });
                            flightPath.setMap(this.map);
                            marker.setPosition(myLatlng);
                        });

                        var infowindow = new google.maps.InfoWindow();
                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infowindow.setContent(this.locations[i][0]);
                                infowindow.open(this.map, marker);
                            }
                        })(marker));
                    }
                    catch (E) {
                        this.map = null;
                        console.log('Reload')
                    }

                }
            );
    }

}
