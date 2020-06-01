import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor( public _hospitalService: HospitalService,
                public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales());
  }

  buscarHospital( termino: string ) {

    if( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
          .subscribe( hospitales => this.hospitales = hospitales );

  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales );
  }

  borrarHospital(hospital: Hospital) {

    // this._hospitalService.borrarHospital( hospital._id )
          // .subscribe( () => this.cargarHospitales());
          swal.fire({
          title: '¿Está seguro?',
          text: 'Está a punto de eliminar a ' + hospital.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        })
        .then((borrar) => {

          if(borrar.value){
            this._hospitalService.borrarHospital( hospital._id )
                    .subscribe( borrado => {
                      swal.fire(
                        'Hospital eliminado',
                        'El registro fue eliminado con éxito',
                        'success'
                      )
                      console.log(borrado);
                      this.cargarHospitales();
                    });

                  } else if ( borrar.dismiss === swal.DismissReason.cancel ) {
                        // swal.fire('Cancelado', 'No se ha eliminado ningún registro', 'error');
                      }
            });

  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
          .subscribe( () => {
            swal.fire('Hospital actualizado','El nombre del hospital fue modificado','success');
          });

  }

  crearHospital(){

    swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((valor) => {
      if ( !valor.value || valor.value.length === 0) {
        return;
      }

      this._hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales());
    });

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
