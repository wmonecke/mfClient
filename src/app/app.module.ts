import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewuserlandingComponent } from './newuserlanding/newuserlanding.component';
import { ExistinguserlandingComponent } from './existinguserlanding/existinguserlanding.component';

import { AuthserviceService } from './my-services/authservice.service';
import { AuthGuard } from './auth.guard';
import { StatpageComponent } from './statpage/statpage.component';
import { ChartsModule } from 'ng2-charts';
import { MomentModule } from 'angular2-moment';
import { MeditatepageComponent } from './meditatepage/meditatepage.component';


@NgModule({
  declarations: [
    AppComponent,
    NewuserlandingComponent,
    ExistinguserlandingComponent,
    StatpageComponent,
    MeditatepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule,
    MomentModule,
    FacebookModule.forRoot()
  ],
  providers: [AuthserviceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
