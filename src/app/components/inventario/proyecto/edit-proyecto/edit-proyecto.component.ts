import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DialogAddInmuebleComponent } from '../Dialogs/dialog-add-inmueble/dialog-add-inmueble.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css'],
})
export class EditProyectoComponent implements OnInit {
  panelOpenState = false;
 

  public lst_tipoInmueble: any = [];
  public estados: any = [];
  public lst_ciudades: any = [];
  public lst_filtroCiudades: any = [];
  public Tipo_Proyecto = [
    { id: 1, name: 'Residencial' },
    { id: 2, name: 'Comercial' },
    { id: 3, name: 'Residencial y Comercial' },
  ];

  public Extension = [
    { id: 1, name: 'Terraza' },
    { id: 1, name: 'Balcón' },
  ];

  //Id que llega por Url
  public id;

  public proyectoUpdate: any = [];
  public ListTorres: any = [];
  public listInmueble: any = [];
  page_size: number = 5; // CANTIDAD DE ELEMENTOS POR PAGINA
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(
    private activatedRouter: ActivatedRoute,
    private _dataService: DataService,
    public dialog: MatDialog
  ) {
    this.id = this.activatedRouter.snapshot.params.id;
    this.getProyecto();
  }

  ngOnInit() {
    this.getEstados();
    this.getCiudades();
    this.getTipoInmueble();
  }

  // ------------------------------------------------------------
  // Metodo que maneja el paginador
  // ------------------------------------------------------------

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  // ------------------------------------------------------------
  //  Metodo para abrir el dialogo de agregar un nuevo inmueble
  // ------------------------------------------------------------

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddInmuebleComponent, {
      width: '900px',
      height:'450px',
      data: { IdProject: this.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      this.ConsultarTorrres() ;
    });
  }

  // ------------------------------------------------------------
  //  metodos para obtener datos Metodos Get
  // ------------------------------------------------------------
  getProyecto() {
    this._dataService.viewData('proyectos', this.id).subscribe(
      (res) => {
        this.proyectoUpdate = res.data;

        this.ConsultarTorrres();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTipoInmueble() {
    this._dataService.getData('tipo_inmueble').subscribe(
      (res) => {
        this.lst_tipoInmueble = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEstados() {
    this._dataService.getData('estados/proyecto').subscribe(
      (res) => {
        this.estados = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCiudades() {
    this._dataService.getData('filtroDepartamento').subscribe(
      (res) => {
        this.lst_ciudades = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filtroCiudades($event) {
    var depa = $event.value;

    this._dataService.getData('filtroMunicipio/' + depa).subscribe(
      (res) => {
        this.lst_filtroCiudades = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // ------------------------------------------------------------
  // Metodo para validar si ese nombre del proyecto ya no existe en la db
  // ------------------------------------------------------------
  ValidarProyecto(event) {
    let string = event.target.value;

    this._dataService.getData('validarNombreProyecto/' + string).subscribe(
      (res) => {
        if (res.data.length !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ya existe un proyecto con el mismo nombre',
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ------------------------------------------------------------
  // Metodo para validar si ese nombre del proyecto ya no existe en la db
  // ------------------------------------------------------------

  ConsultarTorrres() {
    this._dataService.getData('filtroProyectoTorre/' + this.id).subscribe(
      (res) => {
        this.ListTorres = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filtrarInmuebleTorre(event) {
    this.listInmueble = [];
    this._dataService
      .getData('filtroInmueblesTorre/' + event.nombre + '/' + this.id)
      .subscribe(
        (res) => {
          this.listInmueble = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  sumatoria(i) {
    let Area_Habitable_M2 = parseFloat(this.listInmueble[i].Area_Habitable_M2);
    let Area_Extension_M2 = parseFloat(this.listInmueble[i].Area_Extension_M2);

    this.listInmueble[i].Area_Total_M2 = Area_Extension_M2 + Area_Habitable_M2;
  }

  // ------------------------------------------------------------
  // Metodo para editar el proyecto
  // ------------------------------------------------------------

  Editar() {
    this._dataService
      .updateData('proyectos', this.proyectoUpdate, this.id)
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización Realizada',
            text: 'Se actualizaron los campos ',
          });
        },
        (err) => {
          console.log(err);
        }
      );

    for (let index = 0; index < this.listInmueble.length; index++) {
      const element = this.listInmueble[index];
      console.log(element);
      this._dataService
        .updateData('inmueble', element, element.id_unidad)
        .subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Actualización Realizada',
              text: 'Se actualizaron los campos ',
            });
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
