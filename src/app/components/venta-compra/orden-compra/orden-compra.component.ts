import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {DialogOrdenCompraComponent} from './../dialog-orden-compra/dialog-orden-compra.component'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
})
export class OrdenCompraComponent implements OnInit, OnDestroy {
  public listMateriales: any = [];
  panelOpenState = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _dataService: DataService, public dialog: MatDialog,) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };
    this.getData();
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getData() {
    this._dataService.getData('ordenesCompra').subscribe(
      (response) => {

        if (response.status == 'success') {
          this.listMateriales = response.data;

          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
    openDialog(data,key) {
      
      const dialogRef = this.dialog.open(DialogOrdenCompraComponent, {
      width: '1050px',
      height: '300px',

      data: {estado: data,tipoEvent:key}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();

      console.log(`Dialog result: ${result}`);
    });
    }


}
