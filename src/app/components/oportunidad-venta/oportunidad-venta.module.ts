import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';

import { OportunidadVentaRoutingModule } from './oportunidad-venta-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddOportunidadComponent } from './oportunidades/add-oportunidad/add-oportunidad.component';

import { ListClientComponent } from './clientes/list-client/list-client.component';
import { AddClientComponent } from './clientes/add-client/add-client.component';

import { TareasComponent } from './tareas/tareas.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesModule } from 'src/app/pages/pages.module';
import { AddTareaComponent } from './tareas/add-tarea/add-tarea.component';

import { BreadcrumbModule } from 'angular-crumbs';

import {NgxMaskModule, IConfig} from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    DashboardComponent,
    AddOportunidadComponent,

    ListClientComponent,
    AddClientComponent,

    TareasComponent,
    AddTareaComponent,
  ],
  imports: [
    CommonModule,
    PagesModule,
    MaterialModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
NgxMaskModule,
    NgbModalModule,
    OportunidadVentaRoutingModule,

    BreadcrumbModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OportunidadVentaModule {}
