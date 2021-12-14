import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-materia',
  templateUrl: './list-materia.component.html',
  styleUrls: ['./list-materia.component.css']
})
export class ListMateriaComponent implements OnInit, OnDestroy{

  public status: string;
  public list_product;
  public maskCelular = "(000) 000 0000";

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {


    this.getData();
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

  getData() {
    this._dataService.getData('producto').subscribe(
      (response) => {
        if (response.status == 'success') {
          this.list_product = response.producto;

          console.log(this.list_product);
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  deleteProducto(id) {
    Swal.fire({
      title: 'Seguro que desea eliminar el producto?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._dataService.deleteData('producto', id).subscribe(
          (res) => {
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
                  this.getData();
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Se eliminó correctamente.. ',
              });
            }
          },
          (err) => {
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
              title: 'Se presentó un error.. ',
            });
          }
        );
      } else if (result.isDenied) {
      }
    });
  }

}
