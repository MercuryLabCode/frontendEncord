export class Cotizaciones{

    constructor(

        public id:number,
        public id_cliente:number,
        public id_user:number,
        public id_op_venta :number,
        public id_inmueble:number,
        public cuota_congelacion: number,
        public pFecha_congelacion:string,
        public porcentaje_cuota_inicial: number,
        public valor_separacion:number,
        public cuota_inicial:number,
        public descuento:number,
        public fecha_cuota_inicial:string,
        public num_cuotas:number,
        public valor_cuota:number,
        public valor_credito:number


    ){}

}
