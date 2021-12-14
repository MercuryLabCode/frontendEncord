import {Component, Inject,OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Producto } from '../../models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit  {
public producto: Producto;

  public status: string;
  public list_categoria;
  public list_medida;
  public list_proveedores;
  public user;
  constructor(private _dataService: DataService,private _userService: UserService) {

    this.producto = new Producto(1,'','',0,0,0,0,0,0,'');
   }




ngOnInit(){


    this.getCategoria();
    this.getMedida();
    this.getProveedores();
    this.user = this._userService.getIdentity();

  }

    getCategoria() {
    this._dataService.getData('category').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.list_categoria = res.categoria;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedida() {
    this._dataService.getData('medida').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.list_medida = res.data;
          console.log(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProveedores() {
    this._dataService.getData('proveedor').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.list_proveedores = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(form) {
    this.producto.user=this.user.sub;
    console.log( this.producto);
    this._dataService.addData('producto', this.producto).subscribe(
      (res) => {
        this.status = res.status;
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
          title: 'Producto registrado con exito!!!',
        });

        form.reset();
      },
      (err) => {
        this.status = 'error';
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            console.log(err);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Error al registrar el nuevo producto ',
        });
      }
    );
  }
}
