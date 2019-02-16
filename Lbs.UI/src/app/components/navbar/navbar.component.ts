import { Component, OnInit, Output, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { alertNotifierService } from '../../services/alert-notifier.service';
import { AlertService } from 'app/services/alert.service';
import * as moment from 'moment';
import { Subscription, interval } from 'rxjs';
import { INotifications } from 'app/interfaces/message';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    // @Output() notifications: Array<any> = [];
    // @Output() messages: any[] = [];

    messages: INotifications[] = [];
    latestMessages: INotifications[] = [];

    subscription: Subscription;

    constructor(location: Location, private element: ElementRef, private router: Router, private notifierService: alertNotifierService,
        private alertService: AlertService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        this.getSocketData();

    }
    hubConnection: any;
    socketData = [];
    getSocketData() {
        console.log("MAP:SocketData Init");
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44380/message')
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnection.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.error('Error while establishing connection :('));
        this.hubConnection.on('BroadcastMessage', (data: any) => {
            this.socketData = JSON.parse(data);
            console.log("MAP:SocketData:", data);
            var notification = {
              'imei': this.socketData["IMEI"],
              'speed': this.socketData["Speed"],
              'fuel': this.socketData["Fuel"],
              'actual_date': moment(this.socketData["ActualDate"]).fromNow(),
              'message': ""
            }
            if (notification.speed > 150 && notification.fuel < 10 ) {
              notification.message = "Speed Crossed Limits and Low Fuel Level !!";
              this.messages.push(notification);
              this.latestMessages.push(notification);
            }
            else if (notification.fuel < 10 ){
              notification.message = "Low Fuel Level !!";
              this.messages.push(notification);
              this.latestMessages.push(notification);
            }
            else if(notification.speed > 150){
              notification.message = "Speed Crossed Limits !!";
              this.messages.push(notification);
              this.latestMessages.push(notification);
            }
            else
              console.log("within range")
              console.log("notifications array: ", this.messages)
        });
    }

    
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    messageCountRefresh(){
        this.latestMessages = [];
    }
}
