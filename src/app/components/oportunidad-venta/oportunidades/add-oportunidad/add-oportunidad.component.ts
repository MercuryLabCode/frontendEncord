import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Oportunidad_venta } from '../../../../models/oportunidad_venta';
import { UserService } from '../../../../services/user.service';
import { DataService } from '../../../../services/data.service';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subject,Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
export interface cliente {
   Client_Name: string;
}


@Component({
  selector: 'app-add-oportunidad',
  templateUrl: './add-oportunidad.component.html',
  styleUrls: ['./add-oportunidad.component.css'],
})
export class AddOportunidadComponent implements OnInit {

  isLinear = false;
  removable = true;
  public oportunidad: Oportunidad_venta;

  public list_cliente = [];
  public list_Proyecto = [];
  public list_inmuebles = [];

  public select = [];
  public cliente;

  public valor_total = 0;
  public total_compra = [];
  public date;
  public user;
  public status = true;
  public total_oportunidad = 0;
  public ProjectName;

  minDate = new Date();

  public registerInformacion: FormGroup;

  public listEstados = [
    { id: 1, name: 'Creada' },
    { id: 2, name: 'Visita' },
    { id: 3, name: 'Prospecto' },
    { id: 4, name: 'Ganada' },
    { id: 5, name: 'Perdida' },
    { id: 6, name: 'Cerrada' },
  ];

  keyword = 'nombre';


  myControl = new FormControl();

  filteredOptions: Observable<cliente[]>;


  list_select = [];
  public formulario = 0;
  form: FormGroup;
  valor_input = 0;
  public NotFound = 'No se encontró un dato con ese nombre';
  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.oportunidad = new Oportunidad_venta(0, 0, 0, 0, 0, 0, '', 0, '');
    this.registerInformacion = this.formBuilder.group({
      cliente:['',Validators.required],
      fecha:['',Validators.required],
      estado:['',Validators.required],
      descripcion:['']


    });
  }

  ngOnInit() {
    this.user = this._userService.getIdentity();
    this.getProyecto();

    this.getCliente();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.Client_Name)),
      map((Client_Name) =>
        Client_Name ? this._filter(Client_Name) : this.list_cliente.slice()
      )
    );


  }

  /**
      eventos  para el autocomplete de cliente
   */
    displayFn(user: cliente): string {
    return user && user.Client_Name ? user.Client_Name : '';
  }

  private _filter(name: string): cliente[] {
    const filterValue = name.toLowerCase();
  
    return this.list_cliente.filter((option) =>
      option.Client_Name.toLowerCase().includes(filterValue)
    );
  }



  /**
    Metodo que trae los clientes registrados en la base de datos
   */

  getCliente() {
    this._dataService.getData('cliente').subscribe(
      (res) => {
        
        if (res.status == 'success') {
          this.list_cliente = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
    Metodo que consulta todos los proyectos de la base de datos
   */

  getProyecto() {
    this._dataService.getData('proyectos').subscribe(
      (res) => {
        this.list_Proyecto = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
    Metodo para guardar el cliente
  */

  selectCliente(item) {
    let select=item.option.value;
    this.cliente = select.Cliente_ID ;

  }

  /***
      Metodo que filtra inmuebles pasándo el id del proyecto
   */

  selectProyecto(data) {
    this.ProjectName=data.value;
    console.log( this.ProjectName)
    this.list_inmuebles = [];
    this.list_select    = [];
    this.total_oportunidad=0;
    this._dataService.filterData('inmueblesDisponibles', data.value).subscribe(
      (res) => {
        this.list_inmuebles = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }



  /**
      Metodo para los checkbox, para generar una lista de los inmuebles seleccionados
   */
  listadoseleccionados(event) {
    let encontrado = false;
    let posicion = 0;
    this.total_oportunidad=0;
    if (this.list_select.length == 0) {
      this.list_select.push(event);
    } else {
      for (let index = 0; index < this.list_select.length; index++) {
        const element = this.list_select[index];
        if (element.id_unidad == event.id_unidad) {
          encontrado = true;
          posicion = index;
        }
      }
      if (encontrado) {
        this.list_select.splice(posicion, 1);
      } else {
        this.list_select.push(event);
      }
    }

  }

  /**
    Metodo para filtrar los fines de semana
   */

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
    Metodo  para generar la fecha posible de compra
   */

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let mes = event.value.getMonth() + 1;
    this.date =
      event.value.getFullYear() + '-' + +mes + '-' + event.value.getDate();
  }

  /**
  Método para los radios buttons de filtrado
 */

  /**
      Metodo para la ventana emergente donde muestra la información del inmueble
    */

  costoCompra() {


for (let index = 0; index < this.list_select.length; index++) {
  const element = this.list_select[index];
 this.total_oportunidad=element.Valor_Total_Unidad;

}

  }

  //-------------------------------------------------------------------------------
  //--------------------- Metodo para guardar -------------------------------------
  //-------------------------------------------------------------------------------

  /**
      Metodo para guardar las oportunidades de venta
   */

  onSubmit() {
    let validacion = false;

    for (let index = 0; index < this.list_select.length; index++) {
      const element = this.list_select[index];

      let data={

        Cliente_ID: this.cliente,
        Unidad_ID :element.id_unidad,
        Cantidad_Op_Compra:1,
        Precio_Op_Compra:element.Valor_Total_Unidad,
        Expectativa_Fecha_Compra:this.date,
        Descr_Op_Venta:this.registerInformacion.value.descripcion,
        Estado_Op:this.registerInformacion.value.estado,
        User_ID:this.user.sub
      }

      this._dataService
        .addData('oportunidad_venta', data)
        .subscribe(
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
              title: 'Elemento Registrado con Exito!!!',
            });
             this._router.navigate(['/op_venta/dashboard-oportunidad']);

          },
          (err) => {
            console.log(err);
            this.status = false;
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
              title: 'Error al registrar la oportunidad de venta ',
            });
          }
        );
    }
  }
}
