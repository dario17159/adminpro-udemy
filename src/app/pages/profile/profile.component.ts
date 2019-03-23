import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

declare var swal;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario){

    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

  seleccionImagen( archivo: File){
    if ( !archivo ){
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0){
      this.imagenSubir = null;
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result; 

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }
}
