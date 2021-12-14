import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { DataService, UserService } from '@app/services';
import { Cotizaciones } from '../../../models/cotizaciones';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.css'],
})
export class AddCotizacionComponent implements OnInit {
  public dataCliente: any = [];
  public dataUnidad: any = [];

  public user;

  public tipoPago = [
    { id: 1, name: 'Mensual' },
    { id: 2, name: 'Trimestral' },
  ];

  public estadoCotizacion = [
    { id: 1, name: 'Aceptada' },
    { id: 2, name: 'No Aceptada' },
    { id: 3, name: 'En Prospecto' },
  ];

  public dateMin;
  public CotizacionForm: FormGroup;
  public selectEstado;
  public estadoSelect;
  public estadosSeparacion: any = [];
  public estadoseparacion;
  public unidad = 0;
  public fechaCongelacion;
  public fechaCinicial;

  public CuadroPagos: any = [];
  public cotizacionAdd: any = [];
  public tablaPagos = false;

  public oportunidad;
  public referenciaPago;
  public PagosEstado;
  // variables cuando se edita una cotizacion
  public editCotizacion: any = [];

  // filtroInmueble_Cliente
  constructor(
    private _dataService: DataService,
    private _activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this.oportunidad = this._activatedRouter.snapshot.params;

    this.user = this._userService.getIdentity();

    this.CotizacionForm = this.formBuilder.group({
      porcentajeV: ['', Validators.required],
      vDescuento: ['', Validators.required],
      vUnidadFinal: ['', Validators.required],
      vCongelacion: ['', Validators.required],
      fCongelacion: ['', Validators.required],
      vCuotaSeparacion: ['', Validators.required],
      fechaSeparacion: ['', Validators.required],
      vCuotaIncial: ['', Validators.required],
      ValorCuotaInicial: ['', Validators.required],
      numeroCuotas: ['', Validators.required],
      valorCuota: ['', Validators.required],
      cuotaFinal: ['', Validators.required],
      tEstado: ['', Validators.required],
    });
  }

  ngOnInit() {
    let fecha = new Date();
    this.dateMin = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );
    this.getEstados();
    this.extraerDatos();
  }

  /**
    Metodo para filtrar los fines de semana
   */

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  Filter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
    Metodo  para generar la fecha posible de compra
   */

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let mes = event.value.getMonth() + 1;
    this.fechaCongelacion =
      event.value.getFullYear() + '-' + +mes + '-' + event.value.getDate();
  }
  cuotaIncial(type: string, event: MatDatepickerInputEvent<Date>) {
    let mes = event.value.getMonth() + 1;
    this.fechaCinicial =
      event.value.getFullYear() + '-' + +mes + '-' + event.value.getDate();
  }

  getEstados() {
    this._dataService.getData('estados/separacion').subscribe(
      (res) => {
        this.estadosSeparacion = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  extraerDatos() {
    let data = {
      unidad: this.oportunidad.inmueble_id,
      cliente: this.oportunidad.cliente_id,
    };

    if (!this.oportunidad.id) {
      this._dataService
        .addData('mostrarInformacion', this.oportunidad)
        .subscribe(
          (res) => {
            let cliente = res.cliente;
            this.dataCliente = cliente[0];
            let unidad = res.inmueble;
            this.dataUnidad = unidad[0];
            this.unidad = this.dataUnidad.Valor_Total_Unidad;
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this._dataService.viewData('cotizaciones', this.oportunidad.id).subscribe(
        (res) => {
          this.editCotizacion.push(res.data[0]);

          this.cotizacionAdd.PDescuento =
            res.data[0].Porcentaje_Valor_Descuento;
          this.cotizacionAdd.vDescuento = res.data[0].Valor_Descuento;
          this.cotizacionAdd.vUnidadFinal = res.data[0].Valor_Unidad_Final;
          this.cotizacionAdd.vCongelacion = res.data[0].Valor_Congelacion;
          this.fechaCongelacion = res.data[0].Fecha_Congelacion;
          this.fechaCinicial = res.data[0].Fecha_Cuota_Separacion;

          this.selectEstado = res.data[0].Tipo_Cuotas_20;
          this.estadoseparacion = res.data[0].Estado_Separacion;
          this.cotizacionAdd.vCuotaSeparacion =
            res.data[0].Valor_Cuota_Separacion;
          this.cotizacionAdd.vCuotaIncial = res.data[0].Cuota_Inicial;
          this.cotizacionAdd.ValorCuotaInicial =
            res.data[0].Valor_Cuota_Inicial_20;
          this.cotizacionAdd.numeroCuotas = res.data[0].Numero_Cuotas_20;
          this.cotizacionAdd.valorCuota = res.data[0].Valor_Cuota_20;
          this.cotizacionAdd.cuotaFinal = res.data[0].Valor_Cuota_70;
          this.estadoSelect = res.data[0].Estado_Cotizacion;

          // Obtener datos del cliente
          this._dataService
            .viewData('cliente', res.data[0].Cliente_ID)
            .subscribe(
              (res) => {
                this.dataCliente = res.data;
              },
              (err) => {
                console.log(err);
              }
            );
          // Obtener datos de la unidad

          this._dataService
            .viewData('inmueble', this.editCotizacion[0].Unidad)
            .subscribe(
              (res) => {
                this.unidad = res.data.Valor_Total_Unidad;

                this.dataUnidad = res.data;
              },
              (err) => {
                console.log(err);
              }
            );

          // Obtener datos de las fechas de pago
          let data = {
            id: this.oportunidad.id,
          };
          this._dataService.addData('filtroPago', data).subscribe(
            (res) => {
              for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                let data = {
                  id: element.Pagos_Cot_id,
                  Numero_Cuota: element.Numero_Cuota,
                  Cotizacion_id: element.Cotizacion_id,
                  fecha: element.Fecha_Cuota,
                  valor: element.Valor_Cuota,
                };

                this.CuadroPagos.push(data);
              }
              this.tablaPagos = true;
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

  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  estadoSeleccionado(event) {
    this.selectEstado = event;
  }
  tipoCotizacion(event) {
    this.estadoSelect = event;
  }
  // ────────────────────────────────────────────────────────────────────────────────
  // metodo matematicos
  // ────────────────────────────────────────────────────────────────────────────────

  /**
    calcula el valor del
   */

  calcularNuevoValor(event) {
    this.cotizacionAdd.vCongelacion = 1000000;
    let porcentajeDescuento = parseFloat(this.cotizacionAdd.PDescuento);

    this.cotizacionAdd.vDescuento = (this.unidad * porcentajeDescuento) / 100;

    this.cotizacionAdd.vUnidadFinal =
      this.unidad - this.cotizacionAdd.vDescuento;
    this.cotizacionAdd.vCuotaSeparacion =
      (parseFloat(this.cotizacionAdd.vUnidadFinal) * 10) / 100;
    this.cotizacionAdd.vCuotaIncial =
      (parseFloat(this.cotizacionAdd.vUnidadFinal) * 30) / 100;
    this.cotizacionAdd.ValorCuotaInicial =
      parseFloat(this.cotizacionAdd.vCuotaIncial) -
      parseFloat(this.cotizacionAdd.vCuotaSeparacion);
    this.cotizacionAdd.cuotaFinal =
      (parseFloat(this.cotizacionAdd.vUnidadFinal) * 70) / 100;
  }

  CalcularNumeroCuotas() {
    this.cotizacionAdd.valorCuota =
      parseFloat(this.cotizacionAdd.ValorCuotaInicial) /
      this.cotizacionAdd.numeroCuotas;
    this.CuadroPagos = [];
    this.generarCuadroPagos();
  }
  consultarEstado() {
    this._dataService.getData('consultaEstado').subscribe(
      (res) => {
        this.PagosEstado = res.data[1].Catalogo_Estado_Pagos;

        console.log(res.data[1].Catalogo_Estado_Pagos);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  generarCuadroPagos() {
    this.CuadroPagos = [];
    this.tablaPagos = true;
    let encontrar = false;
    var i = 0;
    let estado;
    var cuotas = this.cotizacionAdd.numeroCuotas;
    this.consultarEstado();
    
    var date = new Date(this.fechaCinicial);
    let text = 'Pagos 20%';
    switch (this.selectEstado) {
      case 'Mensual':
        for (let index = 0; index < cuotas; index++) {
          i = i + 1;
          let mes = date.getMonth() + i;
          let newDate = date.getFullYear() + '-' + +mes + '-' + date.getDate();

          this._dataService.getData('validacion/' + text).subscribe(
            (res) => {
              let data = {
                id: index + 1,
                Numero_Cuota: cuotas,
                Item_Pago: 'Cuota Incial',
                Sub_Item_Pago: 'Pagos 20%',
                Descr_Item_Pago: 'Credito Pago 20% sin intereses',
                Porcentaje_Pago: res.data[0].Porcentaje_Equivalente,
                fecha: newDate,
                Estado_Pagos_Cli: this.PagosEstado,

                valor: this.cotizacionAdd.valorCuota,
              };

              this.CuadroPagos.push(data);
            },
            (err) => {
              console.log(err);
            }
          );
        }

        break;

      case 'Trimestral':
        for (let index = 0; index < cuotas; index++) {
          i = i + 3;
          let mes = date.getMonth() + i;
          let newDate = date.getFullYear() + '-' + +mes + '-' + date.getDate();
          this._dataService.getData('validacion/' + text).subscribe(
            (res) => {
              let data = {
                id: index + 1,
                Numero_Cuota: cuotas,
                Item_Pago: 'Cuota Incial',
                Sub_Item_Pago: 'Pagos 20%',
                Descr_Item_Pago: 'Credito Pago 20% sin intereses',
                Porcentaje_Pago: res.data[0].Porcentaje_Equivalente,
                fecha: newDate,
                Estado_Pagos_Cli: this.PagosEstado,
                valor: this.cotizacionAdd.valorCuota,
              };

              this.CuadroPagos.push(data);
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        }
        break;
    }
  }
  editarCuadroPagos(item) {
    Swal.fire({
      title: 'Editar cuota:' + ' ' + item.valor,
      input: 'text',

      inputPlaceholder: item.valor,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Editar',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        for (let index = 0; index < this.CuadroPagos.length; index++) {
          const element = this.CuadroPagos[index];
          if (element.id == item.id) {
            let lastItem = this.CuadroPagos.pop();

            element.valor = name;
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  guardarData() {
    this._dataService.getData('generateReferencia').subscribe(
      (res) => {
        this.referenciaPago = res.data;
      },
      (err) => {
        console.log(err);
      }
    );

    Swal.fire({
      title: 'Deseas guardar la información?',
      showDenyButton: true,

      confirmButtonText: `Guardar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        if (!this.oportunidad.id) {
          let data = {
            Cliente_ID: this.dataCliente.Cliente_ID,

            Op_Venta_ID: this.oportunidad.Op_Venta_ID,

            Unidad: this.oportunidad.Unidad_ID,

            Valor_Total_Unidad: parseFloat(this.oportunidad.Precio_Op_Compra),

            Porcentaje_Valor_Descuento: this.cotizacionAdd.PDescuento,
            Valor_Descuento: this.cotizacionAdd.vDescuento,
            Valor_Unidad_Final: this.cotizacionAdd.vUnidadFinal,
            Valor_Congelacion: this.cotizacionAdd.vCongelacion,
            Fecha_Congelacion: this.fechaCongelacion,
            Valor_Cuota_Separacion: this.cotizacionAdd.vCuotaSeparacion,
            Fecha_Cuota_Separacion: this.fechaCinicial,
            Cuota_Inicial: this.cotizacionAdd.vCuotaIncial,
            Valor_Cuota_Inicial_20: this.cotizacionAdd.ValorCuotaInicial,
            Numero_Cuotas_20: this.cotizacionAdd.numeroCuotas,
            Tipo_Cuotas_20: this.selectEstado,
            Valor_Cuota_20: this.cotizacionAdd.valorCuota,
            Valor_Cuota_70: this.cotizacionAdd.cuotaFinal,
            Estado_Cotizacion: this.estadoSelect,
            Estado_Separacion: this.estadoseparacion,
            User_ID: this.user.sub,
          };

          this._dataService.addData('cotizaciones', data).subscribe(
            (res) => {
              let id_cotizacion = res.data.Cotizacion_id;
              for (let index = 0; index < this.CuadroPagos.length; index++) {
                const element = this.CuadroPagos[index];
                console.log(element);
                let fechaDt = {
                  reference: this.referenciaPago,
                  Estado_Pagos_Cli: element.Estado_Pagos_Cli,
                  Valor_Pago_Cuota: 0,
                  Numero_Cuota: element.Numero_Cuota,
                  Cotizacion_id: id_cotizacion,
                  Item_Pago: element.Item_Pago,
                  Sub_Item_Pago: element.Sub_Item_Pago,
                  Descr_Item_Pago: element.Descr_Item_Pago,
                  Porcentaje_Pago: element.Porcentaje_Pago,
                  Numero_Cuota_ID: element.id,
                  Fecha_Cuota: element.fecha,
                  Valor_Cuota: element.valor,
                  User_ID: this.user.sub,
                };

                this._dataService
                  .addData('fechaPagos/Cotizaciones', fechaDt)
                  .subscribe(
                    (res) => {
                      console.log(" ")
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              }
            },
            (err) => {
              console.log(err);
            }
          );

          this._router.navigate(['/listado-cotizaciones']);

                      Swal.fire(
                        'Se ha generado una nueva cotización, con sus respectivas fechas de pago',
                        '',
                        'success'
                      );
        } else {
          let data = {
            Cliente_ID: this.editCotizacion[0].Cliente_ID,

            Op_Venta_ID: this.editCotizacion[0].Op_Venta_ID,

            Unidad: this.editCotizacion[0].Unidad,

            Valor_Total_Unidad: parseFloat(this.dataUnidad.Valor_Total_Unidad),

            Porcentaje_Valor_Descuento: this.cotizacionAdd.PDescuento,
            Valor_Descuento: this.cotizacionAdd.vDescuento,
            Valor_Unidad_Final: this.cotizacionAdd.vUnidadFinal,
            Valor_Congelacion: this.cotizacionAdd.vCongelacion,
            Fecha_Congelacion: this.fechaCongelacion,
            Valor_Cuota_Separacion: this.cotizacionAdd.vCuotaSeparacion,
            Fecha_Cuota_Separacion: this.fechaCinicial,
            Cuota_Inicial: this.cotizacionAdd.vCuotaIncial,
            Valor_Cuota_Inicial_20: this.cotizacionAdd.ValorCuotaInicial,
            Numero_Cuotas_20: this.cotizacionAdd.numeroCuotas,
            Tipo_Cuotas_20: this.selectEstado,
            Valor_Cuota_20: this.cotizacionAdd.valorCuota,
            Valor_Cuota_70: this.cotizacionAdd.cuotaFinal,
            Estado_Cotizacion: this.estadoSelect,
            Estado_Separacion: this.estadoseparacion,
            User_ID: this.user.sub,
          };

          this._dataService
            .updateData('cotizaciones', data, this.oportunidad.id)
            .subscribe(
              (res) => {
                for (let index = 0; index < this.CuadroPagos.length; index++) {
                  const element = this.CuadroPagos[index];
                  console.log(element);

                  // Pagos_Cot_id:,
                  let fechaDt = {
                    Cotizacion_id: this.oportunidad.id,
                    Numero_Cuota: element.Numero_Cuota,
                    Fecha_Cuota: element.fecha,
                    Valor_Cuota: element.valor,
                    User_ID: this.user.sub,
                  };

                  this._dataService
                    .updateData('fechaPagos/Cotizaciones', fechaDt, element.id)
                    .subscribe(
                      (res) => {
                        this._router.navigate(['/listado-cotizaciones']);
                        Swal.fire(
                          'Se actualizarón los datos correctamente',
                          '',
                          'success'
                        );
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                }
              },
              (err) => {
                console.log(err);
              }
            );
        }
      } else if (result.isDenied) {
        Swal.fire('Se ha cancelado el guardado de la cotización', '', 'info');
      }
    });
  }
}
