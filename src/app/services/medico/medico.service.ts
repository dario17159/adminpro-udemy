import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';


declare var swal;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(private http: HttpClient, private _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number = 0){
    const url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url).pipe(map( (resp: any) => { 
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  cargarMedico(id: string){
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(map( (resp: any) => resp.medico ));
  }

  buscarMedicos(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico( id: string ){
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map( resp => {
      swal('Médico Borrado','Médico borrado correctamente','success');
      return resp;
    }));
  }

  //========================================================================
  //         Funcion que servira para crear como modificar el medico
  //========================================================================
  guardarMedico( medico: Medico){
   if ( medico._id ){
     
      const url = URL_SERVICIOS + '/medico/'+ medico._id + '?token=' + this._usuarioService.token;
  
      return this.http.put(url, medico).pipe(map( (resp: any) => {
        swal('Medico Actualizado', medico.nombre, 'success');
        return resp.medico;
      }));

   } else {

     const url = URL_SERVICIOS + '/medico?token=' + this._usuarioService.token;
     return this.http.post(url, medico).pipe(map((resp: any) => {
       swal('Medico Creado', medico.nombre, 'success');
       return resp.medico;
     }));
   }
  }
}
