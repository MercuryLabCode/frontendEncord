import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenVentaComponent } from './orden-venta/orden-venta.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { GenerarOrdenComponent } from './orden-compra/generar-orden/generar-orden.component';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';


import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [

//  {
//     path: '',
//     component: OrdenCompraComponent,
//     data: { breadcrumb: 'listado ordenes compra' },
//     children: [
//        {
//         path: 'Orden-compra',
//         component: OrdenCompraComponent,
//         canActivate: [AuthGuard],
//         data: { breadcrumb: 'Ordenes de compra' }
//       },
//       {
//         path: 'generar-orden',
//         component: GenerarOrdenComponent,
//         canActivate: [AuthGuard],
//         data: { breadcrumb: 'Generar orden' },
//       },
//     ]

//  },


{
        path: 'Orden-compra',
        component: OrdenCompraComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Ordenes de compra' }
      },
      {
        path: 'generar-orden',
        component: GenerarOrdenComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Generar orden' },
      },


  {
    path: 'Orden-venta',
    component: OrdenVentaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Listado Solicitudes' },
  },

   {
    path: 'ListadoSolicitudes',
    component:  ListadoSolicitudesComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Ordenes de venta' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaCompraRoutingModule {}
