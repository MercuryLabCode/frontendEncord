import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './clientes/add-client/add-client.component';

import { ListClientComponent } from './clientes/list-client/list-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddOportunidadComponent } from './oportunidades/add-oportunidad/add-oportunidad.component';


import { AddTareaComponent } from './tareas/add-tarea/add-tarea.component';
import { TareasComponent } from './tareas/tareas.component';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [


  {
    path: 'nueva_oportunidad',
    component: AddOportunidadComponent,
    canActivate: [AuthGuard],
    data:{breadcrumb:'agregar oportunidad'}
  },

  {
    path: 'editar-cliente/:id',
    component: AddClientComponent,
    canActivate: [AuthGuard],
    data:{breadcrumb:'editar cliente'}

  },
  {
    path: 'adicionar_cliente',
    component: AddClientComponent,
    canActivate: [AuthGuard],
    data:{breadcrumb:'agregar cliente'}
  },

  {
    path: 'listado_clientes',
    component: ListClientComponent,
    canActivate: [AuthGuard],
    data:{breadcrumb:'Clientes'}
  },

  {
    path: 'edit-tarea/:id',
    component: AddTareaComponent,
    canActivate: [AuthGuard],
     data:{breadcrumb:'editar tarea'}

  },

  {
    path: 'add-tarea',
    component: AddTareaComponent,
    canActivate: [AuthGuard],
     data:{breadcrumb:'adicionar tarea'}

  },

  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] ,
  data:{breadcrumb:'tareas'}},
  {
    path: 'op_venta/dashboard-oportunidad',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data:{breadcrumb:'inicio oportunidades'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OportunidadVentaRoutingModule {}
