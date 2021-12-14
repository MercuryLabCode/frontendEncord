import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddCotizacionComponent } from './add-cotizacion/add-cotizacion.component';
import { ListCotizacionesComponent } from './list-cotizaciones/list-cotizaciones.component';

const routes: Routes = [

  {path:'add-cotizacion',component:AddCotizacionComponent,canActivate:[AuthGuard], data:{breadcrumb:'Nueva cotización'}},
  {path:'add-cotizacion/:id',component:AddCotizacionComponent,canActivate:[AuthGuard], data:{breadcrumb:'Nueva cotización'}},

  {path:'listado-cotizaciones',component:ListCotizacionesComponent,canActivate:[AuthGuard], data:{breadcrumb:'Listado de Cotizaciones'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }
