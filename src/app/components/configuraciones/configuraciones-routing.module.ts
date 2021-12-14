import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: 'data-configuracion/add-usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'agegar usuario' },
  },
  {
    path: 'data-configuracion/edit-usuario/:id',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'editar usuario' },
  },
  {
    path: 'data-configuracion',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Configuraciones' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionesRoutingModule {}
