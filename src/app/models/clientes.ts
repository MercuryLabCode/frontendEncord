export class Clientes {
  constructor(
    public id: number,
    public nombre: string,
    public tipo_iden: number,
    public num_identificacion: string,
    public fecha_nacimiento:string,
    public id_n_estudio:string,
    public profesion:string,
    public contacto1: string,
    public contacto2: string,
    public email:string,
    public descripcion:string,
    public id_user: number
  ) {}
}
