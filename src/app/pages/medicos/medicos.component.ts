import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';


declare var swal;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  totalMedicos: number = 0;
  desde: number = 0;

  constructor(private _medicosService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos(this.desde)
    .subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: 'Estas seguro?',
      text: `Estas a punto de eliminar al medico ${medico.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicosService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
        });
      }
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosService
      .buscarMedicos(termino)
      .subscribe(medicos => (this.medicos = medicos));
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalMedicos) {
      return;
    } else if (desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarMedicos();
    }
  }
}
