import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare var swal;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  

  imagenSubir: File;
  imagenTemp: any;

// tslint:disable-next-line: variable-name
  constructor( public _subirArchivoService: SubirArchivoService , public _modalUploadService: ModalUploadService) {}

  ngOnInit() {}

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal(
        'Solo imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch( err => {
        swal('Ha ocurrido un error','No se pudo actualizar la imagen correctamente','warning');
      });
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }
}
