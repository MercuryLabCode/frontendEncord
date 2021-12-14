import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css']
})
export class ListProveedoresComponent implements OnInit,OnDestroy {

  public list_proveedores;

  public name: string;
   dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    this.name = 'proveedores';

    this.getProveedores();


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      dom: 'Bfrtip',
    };

  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getProveedores() {
    this._dataService.getData('proveedor').subscribe(
      (res) => {
        
        if (res.status == 'success') {
          this.list_proveedores = res.data;
         
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
  

  deleteProveedor(id) {
    Swal.fire({
      title: 'Seguro que desea eliminar el proveedor?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._dataService.deleteData('proveedor', id).subscribe(
          (res) => {
              this.getProveedores();

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
            });
          }
        );
      } 
    });
  }

}
