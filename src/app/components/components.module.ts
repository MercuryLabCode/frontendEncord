import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsRoutingModule } from './components-routing.module';

import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { ModulosComponent } from './modulos/modulos.component';
import { OportunidadVentaModule } from './oportunidad-venta/oportunidad-venta.module';


import { PagesModule } from '../pages/pages.module';
import { InventarioModule } from './inventario/inventario.module';
import { CotizacionesModule } from './cotizaciones/cotizaciones.module';
import { ConfiguracionesModule } from './configuraciones/configuraciones.module';
import { VentaCompraModule } from './venta-compra/venta-compra.module';

import { VentaCompraRoutingModule } from './venta-compra/venta-compra-routing.module';
const listComponents = [ModulosComponent, LoginComponent];

@NgModule({
  declarations: [...listComponents],
  imports: [
    CommonModule,
    PagesModule,
    FormsModule,
      ComponentsRoutingModule,
    VentaCompraRoutingModule,
    BrowserModule,
    MaterialModule,

    DataTablesModule,
    HttpClientModule,
    InventarioModule,

    OportunidadVentaModule,

    CotizacionesModule,
    ConfiguracionesModule,
    VentaCompraModule,
  ],
  exports: [...listComponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
