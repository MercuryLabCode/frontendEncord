import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { VentaCompraRoutingModule } from './venta-compra-routing.module';
import { OrdenVentaComponent } from './orden-venta/orden-venta.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { GenerarOrdenComponent } from './orden-compra/generar-orden/generar-orden.component';
import {NgxMaskModule, IConfig} from 'ngx-mask';

import  {PipesModule} from '../../pipes/pipes.module';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';
import { DialogGerenteComponent } from './dialog-gerente/dialog-gerente.component';
import { DialogOrdenCompraComponent } from './dialog-orden-compra/dialog-orden-compra.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    OrdenVentaComponent,
    OrdenCompraComponent,
    GenerarOrdenComponent,
    ListadoSolicitudesComponent,
    DialogGerenteComponent,
    DialogOrdenCompraComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
     PagesModule,
     DataTablesModule,
      MaterialModule,
      FormsModule,
      NgxMaskModule,

      ReactiveFormsModule,

    VentaCompraRoutingModule
  ]
})
export class VentaCompraModule { }
