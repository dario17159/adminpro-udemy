import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioServices: UsuarioService,
    public _modalUploadServices: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadServices.notificacion.subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioServices.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    } else if (desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarUsuarios();
    }
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    } else {
      this.cargando = true;
      this._usuarioServices
        .buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
    }
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id == this._usuarioServices.usuario._id) {
      swal('Error', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: 'Estas seguro?',
      text: `Estas a punto de eliminar al usuario ${usuario.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioServices.borrarUsuario(usuario._id).subscribe(resp => {
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioServices.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string){
    this._modalUploadServices.mostrarModal('usuarios', id);
  }
}
