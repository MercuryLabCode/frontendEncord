import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
})
export class ListClientComponent implements OnInit {
  panelOpenState = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  public list_client = [];
  public list_identificacion = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.getCliente();
    this.getTypeId() ;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };
  }

  getCliente() {
    this._dataService.getData('cliente').subscribe(
      (res) => {
        this.list_client = res.data;
console.log(res)
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
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

  getTypeId() {
    this._dataService.getData('dtIdentificacion').subscribe(
      (res) => {
        this.list_identificacion = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteClient(id){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this._dataService.deleteData('cliente',id).subscribe(
          (res) => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Se eliminó correctamente',
              'success'
            )
            this.getCliente()
          },
          (err) => {
            console.log(err)
            swalWithBootstrapButtons.fire(
              'error!',
              'El cliente se encuentra ligado a una oportunidad de venta',
              'error'
            )
          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })



  }
}
