export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public marca: string,
    public cantidad: number,
    public precio_compra: number,
    public user:number,
    public categoria_id: number,
    public medida_id: number,
    public proveedor_id: number,
    public descripcion: string
  ) {}
}
