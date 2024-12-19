export class Orden {
    _id?: string = '';
    idMesa: string;
    platillos: { idPlatillo: string; cantidad: number }[];
    estado: string;
  
    constructor(idMesa: string, platillos: { idPlatillo: string; cantidad: number }[], estado: string = 'pendiente') {
      this.idMesa = idMesa;
      this.platillos = platillos;
      this.estado = estado;
    }
  }
  