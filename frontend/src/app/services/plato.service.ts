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
  private api = 'http://localhost:3000/api'
  private apiUrlAdd = 'http://localhost:3000/api/addPlato'

  constructor(private http: HttpClient) {}


  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrlGet);
  }

  addPlato(plato: Plato):  Observable<any> {
    return this.http.post<Plato>(this.apiUrlAdd, plato);
  }

  updatePlato(id: string, plato: any): Observable<Plato> {
    return this.http.put<Plato>(`${this.api}/updatePlato/${id}`, plato);
  }

  
  getPlato(id: string): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  deletePlato(id: string): Observable<any> {
    return this.http.delete(`${this.api}/deletePlato/${id}`);
  }
  
}
