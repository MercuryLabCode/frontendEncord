import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { ListCotizacionesComponent } from './list-cotizaciones/list-cotizaciones.component';
import { PagesModule } from '../../pages/pages.module';
import { AddCotizacionComponent } from './add-cotizacion/add-cotizacion.component';
import { MaterialModule } from 'src/app/material.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';

import { DataTablesModule } from 'angular-datatables';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    ListCotizacionesComponent,
    AddCotizacionComponent,


  ],
  imports: [
    CommonModule,
    PagesModule,
    MaterialModule,
 DataTablesModule,
    FormsModule,
NgxMaskModule,
    ReactiveFormsModule,

    CotizacionesRoutingModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CotizacionesModule { }
