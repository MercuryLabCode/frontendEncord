import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css'],
})
export class AddProyectoComponent implements OnInit {
  @ViewChild('stepper', { read: null, static: false })
  public NotFound = 'No se encontró un dato con ese nombre';

  public estados: any = [];
  public lst_inmuebles: [] = [];
  public lst_ciudades: [] = [];
  public lst_filtroCiudades: [] = [];
  public lst_tipoInmueble: [] = [];
  public lst_filter_torre: any = [];

  public TorreProvisional: any = [];
  public actualizar: Boolean = true;

  public sumatoriaResult;
  public sumatoriaResults: any = [];
  public Area_Habitable_M2 = 0;
  public Area_Extension_M2 = 0;

  isLinear = false;
  ProyectoGroup: FormGroup;
  formularioTorre: FormGroup;
  unidadesFormGroup: FormGroup;
  contador = 0;
  public minDate = new Date();
  public Tipo_Proyecto = [
    { id: 1, name: 'Residencial' },
    { id: 2, name: 'Comercial' },
    { id: 3, name: 'Residencial y Comercial' },
  ];

  public Extension = [
    { id: 1, name: 'Terraza' },
    { id: 1, name: 'Balcón' },
  ];

  private myStepper: MatStepper;

  form = this._formBuilder.group({
    lessons: this._formBuilder.array([]),
  });

  unidad = this._formBuilder.group({
    unidades: this._formBuilder.array([]),
  });
  public user;
  get lessons() {
    return this.form.controls['lessons'] as FormArray;
  }
  get unidades() {
    return this.unidad.controls['unidades'] as FormArray;
  }

  //------------------------
  public idProyecto;
  public idTorre;

  constructor(
    private _dataService: DataService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
     private _router: Router
  ) {
    this.user = this._userService.getIdentity();
  }

  ngOnInit() {
    this.ProyectoGroup = this._formBuilder.group({
      pNombre: ['', Validators.required],
      pEstado: ['', Validators.required],
      pTipo: ['', Validators.required],
      pFechaInicio: ['', Validators.required],
      pFechaFinal: ['', Validators.required],
      pDepartamento: ['', Validators.required],
      pCiudad: ['', Validators.required],
      pDireccion: ['', Validators.required],
      pDescripcion: [''],
    });

    this.getEstados();
    this.getCiudades();
    this.getTipoInmueble();
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

  getEstados() {
    this._dataService.getData('estados/proyecto').subscribe(
      (res) => {
        this.estados = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCiudades() {
    this._dataService.getData('filtroDepartamento').subscribe(
      (res) => {
        this.lst_ciudades = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filtroCiudades($event) {
    var depa = $event.value;

    this._dataService.getData('filtroMunicipio/' + depa).subscribe(
      (res) => {
        this.lst_filtroCiudades = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //------------------------------------------------------------------------------
  //----------------------Formulario reactivo para torre--------------------------
  //------------------------------------------------------------------------------

  /**
    Agrega un nuevo formulario para las torres
 */
  addLesson() {
    const lessonForm = this._formBuilder.group({
      tNombre: ['', Validators.required],
      tPisos: ['', Validators.required],
      tDescripcion: [''],
    });
    this.lessons.push(lessonForm);
  }

  /**
    Elimina una torre
   */

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  sumatoria(i) {
    this.Area_Habitable_M2 = parseFloat(
      this.unidad.value.unidades[i].Area_Habitable_M2
    );

    this.Area_Extension_M2 = parseFloat(
      this.unidad.value.unidades[i].Area_Extension_M2
    );

    this.sumatoriaResult = this.Area_Extension_M2 + this.Area_Habitable_M2;

    if (!isNaN(this.Area_Habitable_M2) && !isNaN(this.Area_Extension_M2)) {
      this.sumatoriaResults.push(this.sumatoriaResult);
    }
   
  }
  ValorTotalUnidad(i) {
    let Valor_Parqueadero = parseFloat(
      this.unidad.value.unidades[i].Valor_Parqueadero
    );
    let Valor_Deposito = parseFloat(
      this.unidad.value.unidades[i].Valor_Deposito
    );

    this.unidad.value.unidades[i].Valor_Total_Unidad =
      Valor_Deposito + Valor_Parqueadero;
  }
  //------------------------------------------------------------------------------
  //----------------Formularios reactivo para inmueble----------------------------
  //------------------------------------------------------------------------------

  addInmueble() {
this.extraerdatosTorre();
    const inmuebleForm = this._formBuilder.group({
      torre_ID: ['', Validators.required],
      id: ['', Validators.required],
      Unidad: ['', Validators.required],
      Nomenclatura_Unidad: ['', Validators.required],
      Area_Habitable_M2: ['', Validators.required],
      Area_Extension_M2: ['', Validators.required],
      Tipo_Extension: ['', Validators.required],
      Area_Total_M2: ['', Validators.required],
      No_Parqueaderos: ['', Validators.required],
      Parque_Descr: [''],
      Bodega_Deposito_M2: ['', Validators.required],
      Tipo_Inmueble: ['', Validators.required],
      Estado_Unidad: ['Disponible'],
      Valor_Parqueadero: ['', Validators.required],
      Valor_Deposito: ['', Validators.required],
      Valor_Total_Unidad: ['', Validators.required],
    });
    this.unidades.push(inmuebleForm);
  }
  deleteInmueble(unidadesIndex: number) {
    this.unidades.removeAt(unidadesIndex);
    this.sumatoriaResults.splice(1,unidadesIndex)
    console.log( this.sumatoriaResults);
  }
  /**
    Método para manejar cambios de pasos en el formulario
   */

  stepForward() {
    console.log('object');
    this.myStepper.next();
    window.scrollTo(0, 0);
  }

  stepPrevious() {
    this.myStepper.previous();
  }

  //------------------------------------------------------------------------------
  //----------------Guardar----------------------------
  //------------------------------------------------------------------------------

  submit(value) {
    switch (value) {
      case 1:
        let dateInicio =
          this.ProyectoGroup.value.pFechaInicio.getFullYear() +
          '-' +
          (this.ProyectoGroup.value.pFechaInicio.getMonth() + 1) +
          '-' +
          this.ProyectoGroup.value.pFechaInicio.getDate();

        let dateFin =
          this.ProyectoGroup.value.pFechaFinal.getFullYear() +
          '-' +
          (this.ProyectoGroup.value.pFechaFinal.getMonth() + 1) +
          '-' +
          this.ProyectoGroup.value.pFechaFinal.getDate();

        let data = {
          Project_Name: this.ProyectoGroup.value.pNombre,
          Estado_Proyecto: this.ProyectoGroup.value.pEstado,
          Tipo_Proyecto: this.ProyectoGroup.value.pTipo,
          Fecha_Inicio_Projecto: dateInicio,
          Fecha_Fin_Projecto: dateFin,
          Departamento: this.ProyectoGroup.value.pDepartamento,
          Ciudad: this.ProyectoGroup.value.pCiudad,
          Direccion: this.ProyectoGroup.value.pDireccion,
          Descr_Proyecto: this.ProyectoGroup.value.pDescripcion,
          User_ID: this.user.sub,
        };

        if (this.idProyecto != null) {
          this._dataService
            .updateData('proyectos', data, this.idProyecto)
            .subscribe(
              (res) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Actualización Realizada',
                  text: 'Se actualizaron los campos ',
                });
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
          this._dataService.addData('proyectos', data).subscribe(
            (res) => {
              console.log(res);
              this.idProyecto = res.id;
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
                title:
                  'Se agrego correctamente el proyecto con código' +
                  this.idProyecto,
              });
            },
            (err) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Se ha presentado un error al guardar el proyecto',
                text: err.error.mensaje,
                footer: 'Revisa por favor los datos',
              });
            }
          );
        }
        break;
      case 2:
        // public idProyecto;
        // public idTorre;

        for (let index = 0; index < this.lessons.value.length; index++) {
          const element = this.lessons.value[index];

          let torre = {
            nombre: element.tNombre,
            cant_pisos: element.tPisos,
            id_proyecto: this.idProyecto,
            id_user: this.user.sub,
            descripcion: '',
          };

          this._dataService.addData('torre', torre).subscribe(
            (res) => {
              this.TorreProvisional.push(torre);
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
                title: 'Se agrego correctamente la(s) torre(s)',
              });
            },
            (err) => {
              console.log(err);
            }
          );
        }

      this.extraerdatosTorre();

        break;
      case 3:
        for (let index = 0; index < this.unidades.value.length; index++) {
          const element = this.unidades.value[index];

          let inmueble = {
            Torre_Name: element.torre_ID,
            Proyecto_ID: this.idProyecto,
            Unidad: element.Unidad,
            Nomenclatura_Unidad: element.Nomenclatura_Unidad,
            Area_Habitable_M2: element.Area_Habitable_M2,
            Area_Extension_M2: element.Area_Extension_M2,
            Tipo_Extension: element.Tipo_Extension,
            Area_Total_M2: this.sumatoriaResults[index],
            No_Parqueaderos: element.No_Parqueaderos,
            Parque_Descr: element.Parque_Descr,
            Bodega_Deposito_M2: element.Bodega_Deposito_M2,
            Tipo_Inmueble: element.Tipo_Inmueble,
            Estado_Unidad: element.Estado_Unidad,
            Valor_Parqueadero: parseFloat(element.Valor_Parqueadero),
            Valor_Deposito: parseFloat(element.Valor_Deposito),
            Valor_Total_Unidad: parseFloat(element.Valor_Total_Unidad),
            User_ID: this.user.sub,
          };
          console.log(inmueble);
          this._dataService.addData('inmueble', inmueble).subscribe(
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
              this._router.navigate(['/list-proyecto']);


              Toast.fire({
                icon: 'success',
                title: 'Se agrego correctamente el proyecto',
              });
            },
            (err) => {
              console.log(err);
            }
          );
        }

        break;

      default:
        break;
    }
  }
  extraerdatosTorre() {
    this._dataService
      .filterDataGet('filterProyectoId/' + this.idProyecto)
      .subscribe(
        (res) => {
          this.lst_filter_torre = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ValidarProyecto(event) {
    let string = event.target.value;

    this._dataService.getData('validarNombreProyecto/' + string).subscribe(
      (res) => {
        if (res.data.length !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ya existe un proyecto con el mismo nombre',
          });
          this.ProyectoGroup.reset();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizarNombre(event, i) {
    let string = event.target.value;

    let torreSeleccion = this.TorreProvisional[i];

    // Consultamos si el dato existe
    this._dataService
      .getData('buscarTorre/' + torreSeleccion.nombre + '/' + this.idProyecto)
      .subscribe(
        (res) => {
          let id = res.data[0].id;

          let element = this.lessons.value[i];

          let torre = {
            nombre: element.tNombre,
            cant_pisos: element.tPisos,
            id_proyecto: this.idProyecto,
            id_user: this.user.sub,
            descripcion: '',
          };

          this._dataService.updateData('torre', torre, id).subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
