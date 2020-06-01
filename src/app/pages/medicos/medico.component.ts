import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import swal from 'sweetalert2';
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
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.subscribe( params => {
      // es 'id' porque es el nombre indicado en pages routes en medico/:id
      let id = params['id'];

      if( id != 'nuevo' ) {
        this.cargarMedico( id );
      }

    });

  }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
          .subscribe( (resp: any) => this.medico.img = resp.medico.img);
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
          .subscribe( medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if (f.invalid){
      return;
    }

    this._medicoService.guardarMedico( this.medico )
          .subscribe( medico => {

            this.medico._id = medico._id;

            this.router.navigate(['/medico', medico._id]);
          });
  }

  cambioHospital( id: string ) {
    // console.log(id);
    if(!id){
      this.hospital = new Hospital('');
      return;
    }

    this._hospitalService.obtenerHospital( id )
          .subscribe( hospital => this.hospital = hospital);

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }

}
