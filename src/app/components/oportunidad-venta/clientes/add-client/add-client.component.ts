import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Clientes } from 'src/app/models/clientes';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  public ClienteFormGroup: FormGroup;

  public cliente: any=[];
  public user;
  public maskCelular = "(000) 000 0000";
  public Selectidentificacion:any =[];
  public tipo_identificacion = [];


  public dateInicial: any;

  public id;
  public date;
  public title;
  public title_modulo;

  public nivel_estudio = [
    { id: 1, nivel: 'Profesional' },
    { id: 2, nivel: 'Profesional Especializado' },

    { id: 3, nivel: 'Educación Básica' },
    { id: 4, nivel: 'Otra'}
  ];

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private activatedRouter: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
   
    this.user = this._userService.getIdentity();
   
    this.id = this.activatedRouter.snapshot.params.id;
  }

  ngOnInit() {


    
    this.ClienteFormGroup = this._formBuilder.group({
      Client_Name: ['', Validators.required],
      Tipo_Documento_Cli: ['', Validators.required],
      No_Documento_Cli: ['', Validators.required],
      Fecha_Nacimiento_Cli: ['', Validators.required],
      Nivel_Estudios: ['', Validators.required],
      Profesion_Cli: ['', Validators.required],
      Telefono_Cli: ['', Validators.required],

      Celular_Cli: ['', Validators.required],
      Email_Cli: ['', Validators.required],
      Descr_Cli: [''],
      User_ID: ['', Validators.required]
    });

   
    
    this.getTipoidentificacion();
    if (this.id == null) {
      this.title = 'Registrar';
      this.title_modulo = 'Formulario para registrar nuevo cliente';
    } else {
      this.getShowData();
      this.title = 'Editar';
      this.title_modulo =
        'Formulario para Editar al cliente con código ' + this.id;
    }
  }

  getShowData() {
    this._dataService.viewData('cliente', this.id).subscribe(
      (res) => {
        
        this.cliente = res.data;
        this.date = this.cliente.fecha_nacimiento;
        this.Selectidentificacion=this.cliente.tipo__documento__cli.ID_Ident ;
        this.ClienteFormGroup.value.Client_Name=this.cliente.Client_Name;
        this.ClienteFormGroup.value.Tipo_Documento_Cli=this.cliente.tipo__documento__cli.ID_Ident;
        this.ClienteFormGroup.value.No_Documento_Cli=this.cliente.No_Documento_Cli;
        this.ClienteFormGroup.value.Fecha_Nacimiento_Cli=this.cliente.Fecha_Nacimiento_Cli;
        this.ClienteFormGroup.value.Nivel_Estudios=this.cliente.Nivel_Estudios;

        this.ClienteFormGroup.value.Profesion_Cli=this.cliente.Profesion_Cli;
        this.ClienteFormGroup.value.Celular_Cli=this.cliente.Celular_Cli;
        this.ClienteFormGroup.value.Telefono_Cli=this.cliente.Telefono_Cli;


        this.ClienteFormGroup.value.Email_Cli=this.cliente.Email_Cli;

        this.ClienteFormGroup.value.Descr_Cli=this.cliente.Descr_Cli;





       
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTipoidentificacion() {
    this._dataService.getData('dtIdentificacion').subscribe(
      (res) => {
        this.tipo_identificacion = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }



  onSubmit() {
    this.ClienteFormGroup.value.User_ID=this.user.sub;

let data ={

   Client_Name: this.cliente.Client_Name,
      Tipo_Documento_Cli: this.cliente.Tipo_Documento_Cli,
      No_Documento_Cli: this.cliente.No_Documento_Cli,
      Fecha_Nacimiento_Cli: this.cliente.Fecha_Nacimiento_Cli,
      Nivel_Estudios: this.cliente.Nivel_Estudios,
      Profesion_Cli: this.cliente.Profesion_Cli,
      Telefono_Cli:this.cliente.Telefono_Cli,

      Celular_Cli: this.cliente.Celular_Cli,
      Email_Cli:this.cliente.Email_Cli,
      Descr_Cli: this.cliente.Descr_Cli,
      User_ID: this.user.sub
}

    if (this.id != null) {

      
      this._dataService.updateData('cliente', data, this.id).subscribe(
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
              this._router.navigate(['/listado_clientes']);
            },
          });

          Toast.fire({
            icon: 'success',
            title:
              'Se actualizo correctamente al cliente' + ' ' + 'CLI-' + this.id,
          });
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
            title: 'Se presentó un error!!!!!',
          });
        }
      );
    } else {
      this._dataService.addData('cliente', data).subscribe(
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
              this._router.navigate(['/listado_clientes']);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Cliente registrado con éxito',
          });
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
            title: 'Se presentó un error!!!!!',
          });
        }
      );
    }
  }

  addEvent(event) {
    this.cliente.Fecha_Nacimiento_Cli =
      event.value.getFullYear() +
      '-' +
      (event.value.getMonth() + 1) +
      '-' +
      event.value.getDate();
  }

  CategoriaSeleccionado(event){
this.cliente.Tipo_Documento_Cli=event;

  }
  eventRegresar(){
              this._router.navigate(['/listado_clientes']);

  }
}
