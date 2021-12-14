import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';

export interface DialogData {
  estado: string;
  descripcion: string;
}

@Component({
  selector: 'app-dialog-gerente',
  templateUrl: './dialog-gerente.component.html',
  styleUrls: ['./dialog-gerente.component.css'],
})
export class DialogGerenteComponent {
  estado: string;
  descripcion: string;

  objectData: any = [];
  listEstado = [
    { id: 2, nombre: 'Aprobada ' },
    { id: 3, nombre: 'Rechazada' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogGerenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dataService: DataService
  ) {
    this.objectData = data.estado;
  }

  actualizar() {
    let data = {
      Estado_Gerente: this.estado,
      Comentario: this.descripcion,
    };
    console.log(data);
    this._dataService
      .updateData('revisarGerente' , data,this.objectData.No_Orden)
      .subscribe(
        (res) => {
          console.log(res);
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
