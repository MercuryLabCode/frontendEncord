import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User('', '', '', '', 0, '', '');
  }

  ngOnInit() {
    this.logout();
  }
  onSubmit(from) {
    this._userService.signup(this.user).subscribe(
      (response) => {
     
        //DEvuelve el token
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            (response) => {
              this.identity = response;
             
              sessionStorage.setItem('token', this.token);
              sessionStorage.setItem('identity', JSON.stringify(this.identity));

              if (this.identity.perfil_id == 1) {
                this._router.navigate(['/modulos']);
              } else if (this.identity.perfil_id == 2) {
                this._router.navigate(['/menu-nomina']);
              } else if (this.identity.perfil_id == 3) {
                this._router.navigate(['/menu-inventario']);
              } else if (this.identity.perfil_id == 4) {
                this._router.navigate(['/op_venta/dashboard-oportunidad']);
              } else if (this.identity.perfil_id == 5) {
                this._router.navigate(['/menu-cartera']);
              } else if (this.identity.perfil_id == 6) {
                this._router.navigate(['/compra-venta']);
              } else if (this.identity.perfil_id == 7) {
                this._router.navigate(['/modulos']);
              } else {
              }
            },
            (error) => {
              console.log(error);
              this.status = 'error';
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Verfica tus credenciales',
            footer: 'Comunicarse con nuestros administradores.',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(
      (response) => {
        let logout = +response['sure'];

        if (logout == 1) {
          sessionStorage.removeItem('identity');
          sessionStorage.removeItem('token');
          sessionStorage.clear();
          this.identity = null;
          this.token = null;

          //redirección a la pagina principal

          this._router.navigate(['login']);
        }
      },
      (error) => {}
    );
  }
}
