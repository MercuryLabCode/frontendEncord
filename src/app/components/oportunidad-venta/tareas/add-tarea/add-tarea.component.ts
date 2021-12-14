import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tareas } from 'src/app/models/tareas';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css'],
})
export class AddTareaComponent implements OnInit {
  tarea: Tareas;
  public fecha;
  public estados;

  public user;
  public id;
  public title_button;
  public title;
  public date;
  constructor(
    private activatedRouter: ActivatedRoute,
    private _dataService: DataService,
    private _router:Router,
    private _userService: UserService
  ) {
    this.tarea = new Tareas(0, '', '', 0, 0);
    this.user = this._userService.getIdentity();
    this.id = this.activatedRouter.snapshot.params.id;

    if(this.id!=null){

      this.title_button='Editar';
      this.title='Formulario para editar la tarea';

    }else{
     this.title_button='Registrar';
      this.title='Formulario para Registrar una nueva tarea'
    }
  }

  ngOnInit() {
    this.getEstados();
    if(this.id!=null){
       this.buscarTarea();

    }
  }

  /**
    METODO QUE BUSCA UNA TAREA POR SU ID
   */
  buscarTarea(){

    this._dataService.viewData('tareas',this.id).subscribe(

      res=>{

          this.tarea=res.data;
          this.date = res.data.fecha_recordatorio;
          console.log(this.date);

      },err=>{

        console.log(err);
      }

    );

  }

  getEstados() {
    this._dataService.getData('estado/tarea').subscribe(
      (res) => {

        this.estados = res.data;

      },
      (err) => {}
    );
  }

  onSubmit(form) {
      this.tarea.id_user=this.user.sub;

    if (this.id != null) {
      this._dataService.updateData('tareas', this.tarea,this.id).subscribe(
        (res) => {
          form.reset();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
              this._router.navigate(['/tareas']);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Tarea editada!!!',
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this._dataService.addData('tareas', this.tarea).subscribe(
        (res) => {
          form.reset();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
                 this._router.navigate(['/tareas']);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Tarea creada!!!',
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
 addEvent(event) {
    this.tarea.fecha_recordatorio =
      event.value.getFullYear() +
      '-' +
      (event.value.getMonth() + 1) +
      '-' +
      event.value.getDate();
  }
}
