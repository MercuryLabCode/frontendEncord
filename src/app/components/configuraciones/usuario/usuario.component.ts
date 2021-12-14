import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  public hide = true;
  public formUsers: FormGroup;

  public list_perfil: any = [];

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '200',
    uploadAPI: {
      url: global.url + 'usuario/upload',
      method: 'POST',
      headers: {
        Authorization: this._userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,

    hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Selecione una imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Subir fotografia',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecione un archivo',
      afterUploadMsg_success: 'Se ha cargado correctamente el archivo',
      afterUploadMsg_error: 'Se ha presentado un error',
      sizeLimit: 'peso maximo',
    },
  };

  public id;
  constructor(
    private _dataService: DataService,
    private activatedRouter: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) {
    this.id = this.activatedRouter.snapshot.params.id;
  }

  ngOnInit(): void {
    this.formUsers = this._formBuilder.group({
      User_Name: ['', Validators.required],
      User_Apellido: ['', Validators.required],
      User_Contrasena: ['', Validators.required],
      Perfil_User: ['', Validators.required],
      User_Email: ['', Validators.required],
      	User_Ruta_Imagen:[''],
      User_Descripcion: [''],
    });
    this.getPerfiles();

    if (this.id) {
      this.getCliente();
    }
  }

  getPerfiles() {
    this._dataService.getData('perfil').subscribe(
      (res) => {
        this.list_perfil = res.perfiles;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCliente() {
    this._dataService.viewData('usuario/detail', this.id).subscribe(
      (res) => {
        console.log(res);
        // this.usuario = res.user;
      },
      (err) => {}
    );
  }
  openInput() {
    document.getElementById('fileInput').click();
  }
  onSubmit() {
    let usuario = {
      Perfil_User: this.formUsers.value.Perfil_User,
      User_Apellido: this.formUsers.value.User_Apellido,
      User_Contrasena: this.formUsers.value.User_Contrasena,
      User_Descripcion: this.formUsers.value.User_Descripcion,
      User_Email: this.formUsers.value.User_Email,
      User_Name: this.formUsers.value.User_Name,
      User_Ruta_Imagen:this.formUsers.value.User_Ruta_Imagen
    };
   
    this._dataService.addData('usuario/registro', usuario).subscribe(
      (res) => {
        console.log(res);
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
          title: 'Creado el nuevo usuario',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
 
  docUpload(event){


    this.formUsers.value.User_Ruta_Imagen=event.body.image;
  }
}
