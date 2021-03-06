import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { KibanadashboardComponent } from '../../kibanadashboard/kibanadashboard.component';
import { SpeedanalysisComponet } from '../../speedanalysis/speedanalysis.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import {SafePipe} from '../../pipes/safe.pipe'


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,MatTableModule,
  MatPaginatorModule
  
} from '@angular/material';
import { TableElementComponent } from 'app/table-list/elements/table-element/table-element.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule, 
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    KibanadashboardComponent,
    SpeedanalysisComponet,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TableElementComponent,
    SafePipe
  ]
})

export class AdminLayoutModule {}
