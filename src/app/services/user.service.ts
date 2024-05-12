// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interfece';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;  // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario`, usuario);
  }
  update(id:number,usuario: Usuario): Observable<Usuario> {
    usuario.id=id;
    return this.http.put<Usuario>(`${this.apiUrl}/usuario/${id}`, usuario);
  }
  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario`);
  }
  get(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/${id}`);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/usuario/${id}`);
  }
}
