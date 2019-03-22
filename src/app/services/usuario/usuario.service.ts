import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

declare var swal;
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient , public router: Router) {
    this.cargarStorage();
  }

  //========================================================================
  //         Verificar estado logueado
  //========================================================================

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }


  //========================================================================
  //         cargar datos del storage si es que existen
  //========================================================================
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else {
      this.token = '';
      this.usuario = null;
    }
  }

  //========================================================================
  //         guardar datos en el storage local
  //========================================================================

  guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }


  //========================================================================
  //         cerrar sesion
  //========================================================================

  logOut(){
      this.usuario = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
  }

  //========================================================================
  //         Log de google
  //========================================================================
  loginGoogle( token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token })
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario );
        return true;
      }));
  }

  //========================================================================
  //         log normal
  //========================================================================

  login( usuario: Usuario, recordar: boolean = false) {

    if (recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .pipe(map( (resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario );

        return true;

      }));
  }

  //========================================================================
  //         Crear usuario si no esta dentro de la base de datos
  //========================================================================

  crearUsuario( usuario: Usuario) {
     const url = URL_SERVICIOS + '/usuario';

    //  return this.http.post( url, usuario);

     return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }


}
