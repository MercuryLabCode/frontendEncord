import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-cotizaciones',
  templateUrl: './list-cotizaciones.component.html',
  styleUrls: ['./list-cotizaciones.component.css'],
})
export class ListCotizacionesComponent implements OnInit {
  panelOpenState = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public list_cotizaciones: any = [];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.getCotizaciones();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };
  }

  getCotizaciones() {
    this._dataService.getData('cotizaciones').subscribe(
      (res) => {
        this.list_cotizaciones = res.data;
        console.log( this.list_cotizaciones );

        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      },
      (err) => {
        console.log(err);
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    );
  }
  deleteData(id){

  }
}
