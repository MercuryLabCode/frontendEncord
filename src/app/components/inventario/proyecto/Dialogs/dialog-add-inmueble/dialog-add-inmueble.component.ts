import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

export interface DialogData {
  IdProject: string;
}

@Component({
  selector: 'app-dialog-add-inmueble',
  templateUrl: './dialog-add-inmueble.component.html',
  styleUrls: ['./dialog-add-inmueble.component.css'],
})
export class DialogAddInmuebleComponent {
  public ListTorres: any = [];
  public ProjectID;
  public lst_tipoInmueble: any = [];
  public Extension = [
    { id: 1, name: 'Terraza' },
    { id: 1, name: 'Balcón' },
  ];
  public user;

  public newProject: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogAddInmuebleComponent>,
    private _dataService: DataService,
    private _userService: UserService,
    

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.ProjectID = data.IdProject;
    this.user = this._userService.getIdentity();

    this.ConsultarTorrres();
    this.getTipoInmueble();
  }

  ConsultarTorrres() {
    this._dataService
      .getData('filtroProyectoTorre/' + this.ProjectID)
      .subscribe(
        (res) => {
          this.ListTorres = res.data;
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

  sumatoria() {
    this.newProject.Area_Total_M2 =
      parseFloat(this.newProject.Area_Habitable_M2) +
      parseFloat(this.newProject.Area_Extension_M2);
  }

  guardar() {
    this.newProject.Estado_Unidad = 'Disponible';
    this.newProject.Proyecto_ID = this.ProjectID;
    let data = {
      Torre_Name: this.newProject.torre_ID,
      Proyecto_ID: this.ProjectID,
      Unidad: this.newProject.Unidad,
      Nomenclatura_Unidad: this.newProject.Nomenclatura_Unidad,
      Area_Habitable_M2: this.newProject.Area_Habitable_M2,
      Area_Extension_M2: this.newProject.Area_Extension_M2,
      Tipo_Extension: this.newProject.Tipo_Extension,
      Area_Total_M2: parseFloat(this.newProject.Area_Total_M2),
      No_Parqueaderos: this.newProject.No_Parqueaderos,
      Parque_Descr: this.newProject.Parque_Descr,
      Bodega_Deposito_M2: this.newProject.Bodega_Deposito_M2,
      Tipo_Inmueble: this.newProject.Tipo_Inmueble,
      Estado_Unidad: this.newProject.Estado_Unidad,
      Valor_Parqueadero: parseFloat(this.newProject.Valor_Parqueadero),
      Valor_Deposito: parseFloat(this.newProject.Valor_Deposito),
      Valor_Total_Unidad: parseFloat(this.newProject.Valor_Total_Unidad),
      User_ID: this.user.sub,
    };
   
    this._dataService.addData('inmueble', data).subscribe(
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

        Toast.fire({
          icon: 'success',
          title: 'Se agrego correctamente las Unidades',
        });
        this.onNoClick();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
