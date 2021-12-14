import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DecimalPipe } from '@angular/common';

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SpinnerModule } from './pages/spinner/spinner.module';
import { SpinnerInterceptor } from './pages/interceptors/spinner.interceptor';
// import { NgxMaskModule} from "ngx-mask";

import {BreadcrumbModule} from 'angular-crumbs';



//spinner

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, AppComponent],

  imports: [
    BrowserModule,

    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

    ComponentsModule,

    PagesModule,

    AppRoutingModule,
    NgbModule,
    SpinnerModule,
    BreadcrumbModule,
     NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
DecimalPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
    // {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
  bootstrap: [AppComponent]


})
export class AppModule {}
