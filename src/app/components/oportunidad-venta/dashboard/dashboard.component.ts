import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  public list_venta;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.getOportunidades();

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

  getOportunidades() {
    this._dataService.getData('oportunidad_venta').subscribe(
      (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.list_venta = res.data;

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
      (err) => {
        console.log(err);
      }
    );
  }

  deleteData(id) {
    Swal.fire({
      title: 'Seguro que desea eliminar el dato?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._dataService.deleteData('oportunidad_venta', id).subscribe(
          (res) => {
            this.getOportunidades();

            if (res.status == 'success') {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Se eliminó correctamente el dato.. ',
              });
            }
          },
          (err) => {
            console.log(err);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: 'Se presentó un error.. ',
              text: 'No se puede eliminar el dato',
            });
          }
        );
      }
    });
  }
}
