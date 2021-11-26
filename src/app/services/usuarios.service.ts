import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }

  obtenerUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}`,{});
  }

  editarUsuario(idUsuario:any, formulario:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}/perfil`,formulario);
  }

  editarUbicacion(idUsuario:any, formulario:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}/ubicacion`,formulario);
  }

  editarTarjeta(idUsuario:any, formulario:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}/tarjeta`,formulario);
  }

  obtenerCarritoUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}/carrito`,{});
  }

  obtenerHistorialOrdenes(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}/historial`,{});
  }

  añadirAlCarrito(idUsuario:any, formulario:any){
    return this.httpClient.post(`http://localhost:8888/usuarios/${idUsuario}/agregarProducto`,formulario);
  }
}
