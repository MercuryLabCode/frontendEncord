import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { global } from '../../../services/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  clientes: any = [];
  perfiles: any = [];
  tipoIdentificacion: any = [];
  medidas: any = [];
  public url;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  // variables para actualizar las tablas

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.url = global.url;
    this.getPerfiles();
    this.getClientes();
    this.getTipoIdentificacion();
    this.getMedida();
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

  getClientes() {
    this._dataService.getData('usuarios').subscribe(
      (res) => {
        console.log(res);
        this.clientes = res.users;

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
      }
    );
  }
  getPerfiles() {
    this._dataService.getData('perfil').subscribe(
      (res) => {
        this.perfiles = res.perfiles;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getTipoIdentificacion() {
    this._dataService.getData('dtIdentificacion').subscribe(
      (res) => {
        this.tipoIdentificacion = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMedida() {
    this._dataService.getData('medida').subscribe(
      (res) => {
        this.medidas = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteUser(id) {
    Swal.fire({
      title: 'Esta seguro de eliminar a este usuario?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._dataService.deleteData('users', id).subscribe(
          (res) => {
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
            this.getClientes();

            Toast.fire({
              icon: 'success',
              title: 'Se elimino correctamente el usuario',
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  /**
   *
   *
   * @param {*} url
   * @param {*} id
   * @memberof DashboardComponent
   */
  nuevoDato(url) {
    Swal.fire({
      title: 'Agregar un nuevo dato',
      input: 'text',
      inputPlaceholder: 'Digité el nuevo dato',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        let newData = {
          Nombre_Iden: name,
          Descripcion_Iden: '',
        };

        this._dataService.addData(url, newData).subscribe(
          (res) => {
            Swal.fire({
              title: 'Dato agregado con exito',
              icon: 'success',
            });

            // Recargamos los dato de la tabla a que corresponde la url para no actualizar todas las tablas
            this.updateList(url);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  /**
   *Metodo que cualquier campo de las tablas
   *
   * @param {*} url-> url de la API
   * @param {*} id -> id de dato que se va actualizar
   * @memberof DashboardComponent
   */
  editarCampos(url, data) {
    Swal.fire({
      title: 'Editar, ' + data.nombre,
      input: 'text',
      inputPlaceholder: data.nombre,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Editar',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        let dataUpdate = {
          nombre: name,
          descripicon: data.descripcion,
        };

        this._dataService.updateData(url, dataUpdate, data.id).subscribe(
          (res) => {
            Swal.fire({
              title: 'Dato Actualizado',
              icon: 'success',
            });

            // Recargamos los dato de la tabla a que corresponde la url para no actualizar todas las tablas
            this.updateList(url);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  /**
   *
   *
   * @param {*} url
   * @param {*} data
   * @memberof DashboardComponent
   */
  eliminarCampos(url, data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Esta acción elimina el dato, ' + data.nombre,

        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._dataService.deleteData(url, data.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Dato eliminado',
                icon: 'success',
              });

              this.updateList(url);
            },
            (err) => {
              Swal.fire(
                'Se presentó un error al eliminar el dato',
                'puede ser que el dato sea utilizado en otras instancias',
                'warning'
              );

              console.log(err);
            }
          );
        }
      });
  }

  /**
   *Método que actualiza la tabla dependiendo de la acción
   *
   * @param {*} Url-> parámetro donde se evaluá para la actualización
   * @memberof DashboardComponent
   */
  updateList(url) {
    switch (url) {
      case 'medida':
              this.getMedida();

        break;

      case 'dtIdentificacion':
        this.getTipoIdentificacion();

        break;

      default:
        break;
    }
  }
}
