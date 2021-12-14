import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../../pages/pages.module';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioComponent,
    DashboardComponent

  ],
  imports: [
    
    PagesModule,
    MaterialModule,
    AngularFileUploaderModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    CommonModule,
    ConfiguracionesRoutingModule
  ]
})
export class ConfiguracionesModule { }
