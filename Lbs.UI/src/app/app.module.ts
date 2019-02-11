import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
//import { AgmDirectionModule } from 'agm-direction'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GoogleAPIService } from './services/google-map.services';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { GraphQLModule } from './graphql.module';
import{ChartModule} from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ApiGetService } from './services/api-get.service';
import { AlertService } from './services/alert.service';
import { MomentModule } from 'ngx-moment';






export function highchartsFactory() {
  return highcharts;
}
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    JsonpModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ChartModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoCHGzZmNSFKhEbDjsughQ4x8BXmNvT4'
    }),
    GraphQLModule,
    MomentModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   
  ],
  exports: [
		
		ChartModule,
		
	],
  providers: [GoogleAPIService, ApiGetService, AlertService,
    {
			provide: HighchartsStatic,
      useFactory: highchartsFactory
		},
    
    GoogleAPIService,
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
