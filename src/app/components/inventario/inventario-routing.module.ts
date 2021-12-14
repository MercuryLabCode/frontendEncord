import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddMateriaComponent } from './materia_prima/add-materia/add-materia.component';
import { EditMateriaComponent } from './materia_prima/edit-materia/edit-materia.component';
import { ListMateriaComponent } from './materia_prima/list-materia/list-materia.component';


import { AddProveedorComponent } from './proveedores/add-proveedor/add-proveedor.component';
import { EditProveedorComponent } from './proveedores/edit-proveedor/edit-proveedor.component';
import { ListProveedoresComponent } from './proveedores/list-proveedores/list-proveedores.component';
import { AddProyectoComponent } from './proyecto/add-proyecto/add-proyecto.component';
import { ListProyectoComponent } from './proyecto/list-proyecto/list-proyecto.component';
import { EditProyectoComponent } from './proyecto/edit-proyecto/edit-proyecto.component';
const routes: Routes = [
  {
    path: 'editar_proveedor/:id',
    component: EditProveedorComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Editar proveedores' },
  },

  {
    path: 'adicionar_proveedor',
    component: AddProveedorComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Nuevo Proveedor' },
  },
  {
    path: 'listado_proveedores',
    component: ListProveedoresComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Listado de proveedores' },
  },

  {
    path: 'editar_materia/:id',
    component: EditMateriaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Editar materia prima' },
  },
  {
    path: 'adicionar_materia',
    component: AddMateriaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Agregar materia prima' },
  },
  {
    path: 'listado_materia_prima',
    component: ListMateriaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Listado materia prima' },
  },

  
  


  {
    path: 'list-proyecto',
    component: ListProyectoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Listado Proyectos' },
  },

  {
    path: 'add-proyecto',
    component: AddProyectoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Crear Proyecto' },
  },
  {
    path: 'View-proyecto/:id',
    component: EditProyectoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Ver Proyecto' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class InventarioRoutingModule {}
