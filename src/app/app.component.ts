import { Component, Inject, ViewChild, ElementRef } from '@angular/core';

import { DOCUMENT } from '@angular/common';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public identity;

  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;

  title = 'Mercury Lab';

  validacion = true;
  validacionNavbar = true;

  constructor(@Inject(DOCUMENT) document: any) {}

  ngDoCheck() {
    if (
      document.location.pathname === '/modulos' ||
      document.location.pathname === '/login'
    ) {
      this.validacion = false;
    } else {
      this.validacion = true;
    }

    if (document.location.pathname == '/login') {
      this.validacionNavbar = false;
    } else {
      this.validacionNavbar = true;
    }
  }

  page_size: number = 5 // CANTIDAD DE ELEMENTOS POR PAGINA
  page_number: number = 1
  pageSizeOptions = [5, 10, 20, 50, 100]

}
