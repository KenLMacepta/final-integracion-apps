import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Plato } from '../models/plato'

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private apiUrlGet = 'http://localhost:3000/api/platos'
  private apiUrl = 'http://localhost:3000/api/plato'

  constructor(private http: HttpClient) {}


  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrlGet)
  }


  addPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato)
  }


  updatePlato(id: string, plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${id}`, plato)
  }

  deletePlato(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
