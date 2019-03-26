import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', '', '', '');

  hospital: Hospital = new Hospital('');

  constructor(
    private _medicoService: MedicoService,
    private _hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe(hospitales => (this.hospitales = hospitales));

    this._modalUploadService.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      //En el objeto hospital de la variable local solo almaceno el id del objeto hospital
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService
      .obtenerHospitales(id)
      .subscribe(hospital => (this.hospital = hospital));
  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
