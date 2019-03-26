import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

declare var swal;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  usuario: Usuario;
  token: string;


  constructor(private http: HttpClient, private _usuarioService: UsuarioService) {
    this.token = _usuarioService.token;
    this.usuario = _usuarioService.usuario;
  }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url).pipe(map( (resp: any) => resp.hospitales));
  }

  obtenerHospitales(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
      .pipe(map( (resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/'+ id + '?token=' + this.token;

    return this.http.delete(url);
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;

    return this.http.post(url, { nombre })
      .pipe(map( resp => {
        swal('Enhorabuena','El hopital ha sido creado correctamente', 'success');
        return true;
      }));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;

    return this.http.put(url,hospital)
      .pipe(map( resp => {
        swal('Actualizado Correctamente','success');
        return true;
      }));
  }
}
