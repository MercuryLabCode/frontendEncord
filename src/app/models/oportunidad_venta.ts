export class Oportunidad_venta{

 constructor(

    public id: number,
    public cliente_id:number,
    public inmueble_id:number,
    public id_user:number,
    public cantidad:number,
    public valor_compra:number,
    public fecha_cierre:string,
    public estado_id:number,
    public descripcion:string

 ) {

 }


}
