import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


declare var swal;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];

  cargando: boolean = true;
  totalHospitales: number = 0;
  desde: number = 0;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUploadServices: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadServices.notificacion.subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe( hospitales => {
        this.hospitales = hospitales;
        this.totalHospitales = hospitales.length;
        this.cargando = false;
      });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService
        .crearHospital(valor)
        .subscribe(() => this.cargarHospitales());
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    } else {
      this.cargando = true;
      this._hospitalService
        .buscarHospital(termino)
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
    }
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalHospitales) {
      return;
    } else if (desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarHospitales();
    }
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Estas seguro?',
      text: `Estas a punto de eliminar el hospital ${hospital.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService
          .borrarHospital(hospital._id)
          .subscribe(resp => this.cargarHospitales());
      }
    });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  actualizarImagen(id: string) {
    this._modalUploadServices.mostrarModal('hospitales', id);
  }
}
