export class Obra {
    constructor(
      public id: number,
      public id_proyecto: number,
      public id_tipo_obra: number,
      public id_user: number,
      public dimensiones: string,
      public habitaciones: string,
      public banos:string,
      public parqueadero:string,
      public varlo_unitario:number,
      public descripcion:string

    ) {}
  }
