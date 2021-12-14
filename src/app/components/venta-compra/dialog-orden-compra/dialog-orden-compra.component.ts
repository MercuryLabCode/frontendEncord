import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';

export interface DialogData {
  estado: string;
  descripcion: string;
}
export interface materia {
  nombre: string;
}
@Component({
  selector: 'app-dialog-orden-compra',
  templateUrl: './dialog-orden-compra.component.html',
  styleUrls: ['./dialog-orden-compra.component.css'],
})
export class DialogOrdenCompraComponent {
  stateCtrl = new FormControl();
  filteredStates: Observable<materia[]>;
  estado: string;
  descripcion: string;

  valorNuevo = 0;

  tipos: any = [];
  tipo = 0;

  objectData: any = [];
  nuevaCantidad = 0;
  user;

  newReference: string = '';
  public listMateriales: any = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOrdenCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dataService: DataService,
    private _UserService: UserService
  ) {
    this.objectData = data.estado;
    this.user = this._UserService.getIdentity(); 
    this.tipos = data;
    this.tipo = this.tipos.tipoEvent;

    this.getMateriales();

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      map((nombre) =>
        nombre ? this._filter(nombre) : this.listMateriales.slice()
      )
    );
  }

  getMateriales() {
    this._dataService.getData('producto').subscribe(
      (res) => {
        this.listMateriales = res.producto;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
      eventos  para el autocomplete de cliente
   */
  displayFn(user: materia): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): materia[] {
    const filterValue = name.toLowerCase();

    return this.listMateriales.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }

  materialSeleccionado(event) {
    console.log(event);
  }

  calcularPrecio(event) {
    let valor = parseInt(event.target.value);
    this.nuevaCantidad = valor;
    this.valorNuevo = this.objectData.Precio_Unitario * valor;
  }
  Editar() {
    let data = {
      Material_Name: this.objectData.Material_Name,
      No_Documento_Prov: this.objectData.No_Documento_Prov,
      Cantidad_Material: this.nuevaCantidad,
    };

    this._dataService
      .updateData('ordenesCompra', data, this.objectData.No_Orden)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getReference() {
    this._dataService.getData('generateReferencia').subscribe(
      (res) => {
        this.newReference = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  replicar() {
    let data = {
      User_ID:this.user,
      Material_Name: this.objectData.Material_Name,
      Marca: this.objectData.Marca,
      No_Documento_Prov: this.objectData.No_Documento_Prov,
      Proveedor_Name: this.objectData.Proveedor_Name,
      Estado_Gerente: this.objectData.Estado_Gerente,
      Precio_Unitario: this.objectData.Precio_Unitario,
      Medida: this.objectData.Medida,
      Cantidad_Material: this.nuevaCantidad,
    };

    this._dataService.addData('replicarData', data).subscribe(
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
