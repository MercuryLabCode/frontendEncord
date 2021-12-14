import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-venta',
  templateUrl: './orden-venta.component.html',
  styleUrls: ['./orden-venta.component.css'],
})
export class OrdenVentaComponent implements OnInit {
  panelOpenState = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public newJson: any = [];
  public ciudadesNo: any = [];

  constructor(private _dataService: DataService) {}
  //
  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  
}
