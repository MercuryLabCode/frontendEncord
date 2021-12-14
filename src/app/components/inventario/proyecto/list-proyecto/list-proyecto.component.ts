import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-proyecto',
  templateUrl: './list-proyecto.component.html',
  styleUrls: ['./list-proyecto.component.css']
})
export class ListProyectoComponent implements OnInit {

   dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  public list_proyecto;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };
    this.getProyecto();
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getProyecto() {
    this._dataService.getData('proyectos').subscribe(
      (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.list_proyecto = res.data;

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

  EliminarProyecto(data){


      Swal.fire({
      title: 'Seguro que desea eliminar El proyecto?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._dataService.deleteData('proyectos', data.Proyecto_ID).subscribe(
          (res) => {
            this.getProyecto();

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
              text: 'Se ha presentado un error eliminando el dato.',
            });
          }
        );
      }
    });

  }

}
