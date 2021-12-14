import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent {
  module_list = [
    {
      urlTarget: '/op_venta/dashboard-oportunidad',
      imgSrc: 'op_venta.svg',
      icon: 'fas fa-balance-scale-right',
      label: 'Oportunidad de venta'
    },
    {
      urlTarget: '/menu-cotizacion',
      imgSrc: 'cotizaciones.svg',
      icon: 'fas fa-user-tie',
      label: 'Cotizaciones'
    },
    {
      urlTarget: '',
      imgSrc: 'compra&venta.svg',
      icon: 'fas fa-boxes',
      label: 'Ordenes de compra y venta'
    },
    {
      urlTarget: '/DashBoard_inventario',
      imgSrc: 'inventario.svg',
      icon: 'fas fa-boxes',
      label: 'Inventario'
    },
    {
      urlTarget: '/menu-cartera',
      imgSrc: 'cartera.svg',
      icon: 'fas fa-cash-register',
      label: 'Cartera'
    },
    {
      urlTarget: '/menu-nomina',
      imgSrc: 'nomina.svg',
      icon: 'fas fa-cash-register',
      label: 'Nomina'
    },
    {
      urlTarget: '',
      imgSrc: 'dashboard.svg',
      icon: 'far fa-chart-bar" data-toggle="tooltip" data-placement',
      label: 'Seguimiento'
    },
    {
      urlTarget: '/data-configuracion',
      imgSrc: 'configuracion.svg',
      icon: 'fas fa-users-cog',
      label: 'Usuarios y configuración'
    }
  ]
}
