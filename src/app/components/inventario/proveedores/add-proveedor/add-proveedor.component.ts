import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { UserService } from '../../../../services/user.service';
import { Proveedor } from '../../../../models/proveedor';
import { FormBuilder,  FormGroup,  Validators,  FormControl,} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css'],
})
export class AddProveedorComponent implements OnInit {
  public proveedor: Proveedor;
  public user;
  public status: string;
  public Departamentos: any = [];
  public Ciudades: any = [];
  public ProveedorFormGroup: FormGroup;
  public maskCelular = "(000) 000 0000";
  


  public list_type;

  constructor(
    private _dataService: DataService,
     private _formBuilder: FormBuilder,
    private _userService: UserService,
      private _router: Router,
   
  ) {
    this.proveedor = new Proveedor(0, '', 0, '', '', '', '', '', 0);
  }

  ngOnInit() {
    this.user = this._userService.getIdentity();
    this.getTipoIdentificacion();
    this.getDepartamento();


    this.ProveedorFormGroup = this._formBuilder.group({
      	Proveedor_Name      : ['', Validators.required],
      	Tipo_Documento_Prov : ['', Validators.required],
      	No_Documento_Prov   : ['', Validators.required],
      	Telefono_Prov       : ['', Validators.required],
      	Celular_Prov        : ['', Validators.required],
      	Email_Prov          : ['', Validators.required],
        Ciudad              : ['', Validators.required],
        Direccion_Prov      : ['', Validators.required],
        User_ID             : ['', Validators.required]


    });
  }

  getTipoIdentificacion() {
    this._dataService.getData('dtIdentificacion').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.list_type = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDepartamento() {
    this._dataService.getData('filtroDepartamento').subscribe(
      (res) => {
        if (res.status == 'success') {
          this.Departamentos = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DepartamentoSelect(event) {
    this._dataService.getData('filtroMunicipio/' + event).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.Ciudades = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.ProveedorFormGroup.value.User_ID = this.user.sub;


    this._dataService.addData('proveedor', this.ProveedorFormGroup.value).subscribe(
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
        this._router.navigate(['/listado_proveedores']);

        Toast.fire({
          icon: 'success',
          title: 'registrado con éxito al proveedor!!!',
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
          title: 'Datos incompletos ',
        });
      }
    );
  }
}
