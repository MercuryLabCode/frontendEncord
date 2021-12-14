import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent implements OnInit {




  public status: string;
  public list_categoria;
  public list_medida;
  public list_proveedores;
  public user;
  public materialGroup: FormGroup;
  constructor(private _router: Router,private _dataService: DataService, private _formBuilder: FormBuilder,private _userService: UserService) {
    this.user = this._userService.getIdentity();


   }

  ngOnInit(){

    this.materialGroup = this._formBuilder.group({
     Material_Name: ['', Validators.required],
      Marca : ['', Validators.required],
      	Cantidad_Material: ['', Validators.required],
      Precio_Compra: ['', Validators.required],
      	Categoria: ['', Validators.required],
      Medida : ['', Validators.required],
      No_Documento_Prov : ['', Validators.required],
      User_ID : ['', Validators.required],
     
    });

    this.getCategoria();
    this.getMedida();
    this.getProveedores();
    this.user = this._userService.getIdentity();


  }
  getCategoria() {
    this._dataService.getData('category').subscribe(
      (res) => {
      
        if (res.status == 'success') {
          this.list_categoria = res.data;
            console.log(res);
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
          console.log(this.list_proveedores);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.materialGroup.value.User_ID=this.user.sub;
    this._dataService.addData('producto', this.materialGroup.value).subscribe(
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
              this._router.navigate(['/listado_materia_prima']);

        Toast.fire({
          icon: 'success',
          title: 'Material registrado con exito!!!',
        });


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
          title: 'Validar que todos los campos esten correctamente diligenciados'
        });
      }
    );
  }

  selectTipo(){
              this._router.navigate(['/listado_materia_prima']);

  }


}
