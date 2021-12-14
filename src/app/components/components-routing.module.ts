import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@app/guards';
import { LoginComponent } from './login/login.component';
import { ModulosComponent } from './modulos/modulos.component';



const routes: Routes = [
  { path: 'modulos', component: ModulosComponent, canActivate: [AuthGuard] },


  { path: 'logout/:sure', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },

    // {
    //             path: 'ordenes',
    //             loadChildren:'./venta-compra/venta-compra.module#VentaCompraModule',

    //             data: { breadcrumb: 'ordenes' }
    //         },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }
