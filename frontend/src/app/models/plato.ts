export class Plato {
    _id?: string = ''; 
    nombre: string;
    ingredientes: string;
    precio: string;
    categoria: string; 

    constructor(nombre: string, ingredientes: string, precio: string, categoria: string){
      this.nombre = nombre
      this.ingredientes = ingredientes
      this.precio = precio
      this.categoria = categoria
    }
  }

  