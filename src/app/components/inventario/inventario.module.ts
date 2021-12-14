import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventarioRoutingModule } from './inventario-routing.module';
import  {PipesModule} from '../../pipes/pipes.module';

import { ListProveedoresComponent } from './proveedores/list-proveedores/list-proveedores.component';
import { AddProveedorComponent } from './proveedores/add-proveedor/add-proveedor.component';
import { EditProveedorComponent } from './proveedores/edit-proveedor/edit-proveedor.component';
import { ListMateriaComponent } from './materia_prima/list-materia/list-materia.component';
import { AddMateriaComponent } from './materia_prima/add-materia/add-materia.component';
import { EditMateriaComponent } from './materia_prima/edit-materia/edit-materia.component';



import { PagesModule } from 'src/app/pages/pages.module';

import { ListProyectoComponent } from './proyecto/list-proyecto/list-proyecto.component';
import { AddProyectoComponent } from './proyecto/add-proyecto/add-proyecto.component';
import { EditProyectoComponent } from './proyecto/edit-proyecto/edit-proyecto.component';

import {NgxMaskModule, IConfig} from 'ngx-mask';
import { DialogAddInmuebleComponent } from './proyecto/Dialogs/dialog-add-inmueble/dialog-add-inmueble.component';
import { EditTorreComponent } from './proyecto/Dialogs/edit-torre/edit-torre.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    ListProveedoresComponent,
    AddProveedorComponent,
    EditProveedorComponent,

    ListMateriaComponent,
    AddMateriaComponent,
    EditMateriaComponent,
  
  
 
    ListProyectoComponent,
    AddProyectoComponent,
    EditProyectoComponent,
    DialogAddInmuebleComponent,
    EditTorreComponent,
  ],
  imports: [
    PagesModule,
    MaterialModule,
    CommonModule,
    PipesModule,

    NgxMaskModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    DataTablesModule,
    InventarioRoutingModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InventarioModule {}
