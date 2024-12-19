import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private apiUrlGet = 'http://localhost:3000/api/ordenes';
  private apiUrl = 'http://localhost:3000/api/orden';
  private api = 'http://localhost:3000/api';
  private apiUrlAdd = 'http://localhost:3000/api/addOrden';

  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrlGet);
  }

  addOrden(orden: Orden): Observable<any> {
    return this.http.post<Orden>(this.apiUrlAdd, orden);
  }

  updateOrden(id: string, orden: Partial<Orden>): Observable<Orden> {
    return this.http.put<Orden>(`${this.api}/updateOrden/${id}`, orden);
  }

  getOrden(id: string): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }

  deleteOrden(id: string): Observable<any> {
    return this.http.delete(`${this.api}/deleteOrden/${id}`);
  }
}
