import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.component.html',
  styleUrls: ['./edit-materia.component.css']
})
export class EditMateriaComponent implements OnInit {

  public id;
  public producto:any = [];
  public proveedorSelect:any =[];

  public categorias;
  public medidas;
  public proveedores;

  constructor(

    private activatedRouter: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router

  ) {

    this.id = this.activatedRouter.snapshot.params.id;

   }

  ngOnInit(){

    this.getMedidas();
    this.getProduct();
    this.getCategorias();
    this.getProveedores();
  }

  getProveedores() {
    this._dataService.getData('proveedor').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.proveedores = res.data;
         
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCategorias() {
    this._dataService.getData('category').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.categorias = res.data;
          console.log(this.categorias);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMedidas() {
    this._dataService.getData('medida').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.medidas = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProduct() {
    this._dataService.viewData('producto', this.id).subscribe(
      (res) => {
        console.log(res)
        if (res.status == 'success') {
          this.producto = res.producto;
           this.proveedorSelect =this.producto.no__documento__prov
           console.log(this.proveedorSelect )
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
            console.log(err);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Error al mostrar el dato... ',
          text: 'No existe ese dato en la base de datos',
        });
      }
    );
  }
CategoriaSeleccionado(key,event){
 
switch (key) {
  case 'categoria':
    this.producto.Categoria=event;
    break;
     case 'medida':
    this.producto.Medida=event;
    break;
     case 'proveedor':
    this.producto.No_Documento_Prov=event;
    break;

  default:
    break;
}
}
  onSubmit(registerForm) {
    console.log(this.proveedorSelect);
    let data={

      Material_Name:this.producto.Material_Name,
      Cantidad_Material:this.producto.Cantidad_Material,
      Marca:this.producto.Marca,
      Medida:this.producto.Medida,
      Precio_Compra:this.producto.Precio_Compra,
      Categoria:this.producto.Categoria,
      No_Documento_Prov:this.proveedorSelect.No_Documento_Prov
    };

    this._dataService.updateData('producto', data, this.id).subscribe(
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
               this._router.navigate(['/listado_materia_prima']);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Se actualizó correctamente... ',
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
          title: 'Validar que todo los campos estan correctos... ',
        });
      }
    );
  }
  eventRegresar(){
               this._router.navigate(['/listado_materia_prima']);

  }
}
