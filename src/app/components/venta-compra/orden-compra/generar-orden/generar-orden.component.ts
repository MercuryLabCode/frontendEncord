import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../services/data.service';
import { DialogComponent } from '../../../../pages/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

export interface materia {
  nombre: string;
}

@Component({
  selector: 'app-generar-orden',
  templateUrl: './generar-orden.component.html',
  styleUrls: ['./generar-orden.component.css'],
})
export class GenerarOrdenComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<materia[]>;

  data;
  busquedata: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  list_Materiales: any = [];
  listadoMateriales: any = [];
  list_Proveedores: any = [];
  materialMejor: any = [];
  list_ordenes: any = [];
  panelOpenState = false;
  resultsLength = 0;
  listadoCalculado: any = [];
  cambio = false;
  position = 0;
  searchText;
  materialText;
  user;
  ProveedorText;
  tipoOportunidad = 'vacio';
  title = 'No se registrar ningun Dato aún.';

  //Revision: El usuario que la creo la puede editar
  //Rechazada: El usuario que la pueda replicar para no volver a escribir todo de nuevo se cambia el codigo y se cambia el estado
  //Aprobada: Se envia automaticamente al proveedor

  listEstado = [
    { id: 1, nombre: 'En Revision' },
    { id: 2, nombre: 'Aprobada ' },
    { id: 3, nombre: 'Rechazada' },
  ];

  page_size: number = 5; // CANTIDAD DE ELEMENTOS POR PAGINA
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(
    private _dataService: DataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _UserService: UserService,
    private _router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.getMateriales();
    this.user = this._UserService.getIdentity();

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      map((nombre) =>
        nombre ? this._filter(nombre) : this.listadoMateriales.slice()
      )
    );
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.getData();
  }

  /**
      eventos  para el autocomplete de cliente
   */
  displayFn(user: materia): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): materia[] {
    const filterValue = name.toLowerCase();

    return this.listadoMateriales.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }

  private _filterStates(value: string): materia[] {
    const filterValue = value.toLowerCase();

    return this.listadoMateriales.filter((state) =>
      state.nombre.toLowerCase().includes(filterValue)
    );
  }

  getMateriales() {
    this._dataService.getData('producto').subscribe(
      (res) => {
        this.listadoMateriales = res.producto;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getData() {
    this._dataService.getData('MaterialeFitro').subscribe(
      (res) => {
        this.list_Materiales = res.data;
        console.log(this.list_Materiales);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarProveedores(nombre) {
    this._dataService.viewData('MaterialFitroNombre', nombre).subscribe(
      (res) => {
        this.list_Proveedores = res.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calcularValor(Cantidad, proveedor, key) {
    
    
    let Ncantidad = Cantidad.target.value;

    let aux = Ncantidad.replace(/\./g, '');

    switch (key) {
      case 'inteligente':
        if (parseInt(Ncantidad) == 0) {
          for (let index = 0; index < this.materialMejor.length; index++) {
            const element = this.materialMejor[index];

            if (element.id == proveedor.id) {
              this.materialMejor.splice(index, 1);

              this.snackBar.open('¡Se ha Eliminado la solicitud!', 'Aceptar', {
                duration: 3000,
              });
            }
          }
        } else {
          for (let index = 0; index < this.listadoCalculado.length; index++) {
            const element = this.listadoCalculado[index];

            if (element.idMaterial == proveedor.id) {
              this.cambio = true;
              this.position = index;
            }
          }

          if (this.cambio) {
            this.listadoCalculado.splice(this.position, 1);
          }
          let operacion = parseInt(Ncantidad) * proveedor.Precio_Compra;

          let data = {
            idMaterial: proveedor.Codigo_ID,
            Material_Name: proveedor.Material_Name,
            Marca: proveedor.Marca,
            Cantidad_Material: parseInt(Ncantidad),
            Precio_Unitario: proveedor.Precio_Compra,
            valor: operacion,
            cantidad_inventario: proveedor.cantidad,
            No_Documento_Prov: proveedor.no__documento__prov.No_Documento_Prov,
            Proveedor_Name: proveedor.no__documento__prov.Proveedor_Name,
            Medida: proveedor.medida.Catalogo_Estado_Uni,
            User_ID: this.user.sub,
          };

          this.listadoCalculado.push(data);
          this.snackBar.open('¡Se ha guardado esta solicitud!', 'Aceptar', {
            duration: 3000,
          });
        }
        break;
      case 'normal':
        if (parseInt(Ncantidad) == 0) {
          for (let index = 0; index < this.listadoCalculado.length; index++) {
            const element = this.listadoCalculado[index];
            if (element.idMaterial == proveedor.id) {
              this.listadoCalculado.splice(index, 1);

              this.snackBar.open('¡Se ha Eliminado la solicitud!', 'Aceptar', {
                duration: 3000,
              });
            }
          }
        } else {
          for (let index = 0; index < this.listadoCalculado.length; index++) {
            const element = this.listadoCalculado[index];

            if (element.idMaterial == proveedor.id) {
              this.cambio = true;
              this.position = index;
            }
          }

          if (this.cambio) {
            this.listadoCalculado.splice(this.position, 1);
          }
          
          let operacion = parseInt(Ncantidad) * proveedor.Precio_Compra;

          let data = {
            idMaterial: proveedor.Codigo_ID,
            Material_Name: proveedor.Material_Name,
            Marca: proveedor.Marca,
            Cantidad_Material: parseInt(Ncantidad),
            Precio_Unitario: proveedor.Precio_Compra,
            valor: operacion,
            cantidad_inventario: proveedor.Cantidad_Material,
            No_Documento_Prov: proveedor.no__documento__prov.No_Documento_Prov,
            Proveedor_Name: proveedor.no__documento__prov.Proveedor_Name,
            Medida: proveedor.medida.Catalogo_Estado_Uni,
            User_ID: this.user.sub,
          };



console.log(data);
          this.listadoCalculado.push(data);
          this.snackBar.open('¡Se ha guardado esta solicitud!', 'Aceptar', {
            duration: 3000,
          });
        }
        break;
      default:
        break;
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent);
    this.getData();
  }

  filtrar(event) {}

  selectTipo(event) {
    switch (event) {
      case 1:
        this.listadoCalculado = [];
        this.tipoOportunidad = 'inteligente';

        break;

      case 2:
        this.listadoCalculado = [];

        this.tipoOportunidad = 'normal';
        break;
      case 3:
        this.listadoCalculado = [];

        this.tipoOportunidad = 'vacio';
        break;
      default:
        break;
    }
  }

  materialSeleccionado(event) {
    let material = event.option.value;

    this._dataService
      .getData(
        'MaterialFitroInteligente/' + material.Material_Name  + '/' + material.Marca
      )
      .subscribe(
        (res) => {
          this.materialMejor.push(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSubmit(key) {
    switch (key) {
      case 'inteligente':
        console.log(this.listadoCalculado == null);
        if (this.listadoCalculado.length == 0) {
          Swal.fire({
            icon: 'info',
            title: 'No tienes ninguna Solicitud agregada',
          });
        } else {
          for (let index = 0; index < this.listadoCalculado.length; index++) {
            const element = this.listadoCalculado[index];
            this._dataService.getData('generateReferencia').subscribe(
              (res) => {
                var referencia = res.data;
                let dt = {
                  No_Orden: referencia,
                  Material_Name: element.Material_Name,
                  Marca: element.Marca,
                  No_Documento_Prov: element.No_Documento_Prov,
                  Estado_Gerente: this.listEstado[0].nombre,
                  Proveedor_Name: element.Proveedor_Name,
                  Precio_Unitario: element.Precio_Unitario,
                  Cantidad_Material: element.Cantidad_Material,
                  Medida: element.Medida,
                  User_ID: element.User_ID,
                };

                this._dataService.addData('ordenesCompra', dt).subscribe(
                  (res) => {
                    console.log(res);
                    if (index < this.listadoCalculado.length) {
                      Swal.fire({
                        icon: 'success',
                        title:
                          'Se genero correctamente la(s) ordenes de compra',
                      });
                      this._router.navigate(['/Orden-compra']);
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }

        break;

      case 'normal':
        this._dataService.getData('generateReferencia').subscribe(
          (res) => {
            let referencia = res.data;

            for (let index = 0; index < this.listadoCalculado.length; index++) {
              const element = this.listadoCalculado[index];

              let dt = {
                No_Orden: referencia,
                Material_Name: element.Material_Name,
                Marca: element.Marca,
                No_Documento_Prov: element.No_Documento_Prov,
                Proveedor_Name: element.Proveedor_Name,
                Estado_Gerente: this.listEstado[0].nombre,

                Precio_Unitario: element.Precio_Unitario,
                Cantidad_Material: element.Cantidad_Material,
                Medida: element.Medida,
                User_ID: element.User_ID,
              };

              this._dataService.addData('ordenesCompra', dt).subscribe(
                (res) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Se genero correctamente la(s) ordenes de compra',
                    footer: 'número ' + res.orden.No_Orden,
                  });
                  this._router.navigate(['/Orden-compra']);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
        break;

      default:
        break;
    }
  }
}
