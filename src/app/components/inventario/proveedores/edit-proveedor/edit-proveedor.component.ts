import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import {Router, ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent implements OnInit {

  public proveedor: any =[];
  public list_type;
  public id;
  public maskCelular = "(000) 000 0000";
  public Departamentos: any = [];
  public Ciudades: any = [];

  constructor(

    private activatedRouter: ActivatedRoute,
    private _dataService: DataService,
    private _router:Router

  ) { 

    this.id = this.activatedRouter.snapshot.params.id;
    
  }

  ngOnInit() {
    
    this.getProduct();
    this.getTipoIdentificacion();
    this.getDepartamento();


  }

  getProduct(){
    this._dataService.viewData('proveedor', this.id).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.proveedor = res.data;
          console.log(res);
    
          
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

    tipoIdentificacion(event){
    this.proveedor.Tipo_Documento_Prov=event;
  }
  onSubmit(form){
console.log(this.proveedor);
    this._dataService.updateData('proveedor',this.proveedor,this.id).subscribe(

      res=>{

        if(res.status=='success'){

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
              this._router.navigate(['/listado_proveedores']);
            },
            
          });
  
          Toast.fire({
            icon: 'success',
            title: 'Se actulizó correctamente el dato... ',
            
          });
        

        }

      },err=>{
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
          title: 'No se puedo actualizar el dato... ',
          
        });

      }

    );

  }


}
