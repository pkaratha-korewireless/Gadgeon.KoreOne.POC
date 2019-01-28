import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { alertNotifierService } from '../../services/alert-notifier.service';
import { interval } from 'rxjs';

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

    public messages: any[] = [];
    messageLen: Number;

    constructor(location: Location, private element: ElementRef, private router: Router, private notifierService: alertNotifierService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    // showNotifications(){
    //     var opened;
	//     var newNotifications = [];
	//     var readNotifications = [];
    //     var awaitingNotifications;
    //     newNotifications = this.messages
    //     function(event: any){
	// 		var targeted = angular.element($event.target).closest('.dropdown-container').find('.dropdown-menu');
	// 		opendd = targetdd;
	// 	    if(targetdd.hasClass('fadeInDown')){
	// 	    	hidedd(targetdd);
	// 	    }
	// 	    else{
	// 	    	targetdd.css('display', 'block').removeClass('fadeOutUp').addClass('fadeInDown')
	// 	    									.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(){
	//   												angular.element(this).show();
	//   											});
    //       targetdd.find('.dropdown-body')[0].scrollTop = 0;
	// 	    	$scope.awaitingNotifications = 0;
	// 	      	angular.element('#notifications-count').removeClass('fadeIn').addClass('fadeOut');
	// 	    }
	// 	};
    // }


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
        interval(5000).subscribe(a => {
            this.notifierService.getNotificationContent().subscribe(message => {
                debugger;
                console.log(message);
                this.messages.push(message);
                console.log("message: ", this.messages)
                this.messageLen = this.messages.length;
               // this.messages = this.messages.slice(0, this.messages.length);
                console.log(this.messages);
                console.log("messageLength: ", this.messageLen)
            })
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
}
