import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
          .subscribe( medicos => this.medicos = medicos );
  }

  buscarMedico( termino: string ) {

    if ( termino.length === 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
          .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {

            swal.fire({
            title: '¿Está seguro?',
            text: 'Está a punto de eliminar a ' + medico.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          })
          .then((borrar) => {

            if(borrar.value){
              this._medicoService.borrarMedico( medico._id )
                      .subscribe( borrado => {
                        swal.fire(
                          'Usuario eliminado',
                          'El registro fue eliminado con éxito',
                          'success'
                        )
                        console.log(borrado);
                        this.cargarMedicos();
                      });

                    } else if ( borrar.dismiss === swal.DismissReason.cancel ) {
                          // swal.fire('Cancelado', 'No se ha eliminado ningún registro', 'error');
                        }
              });
          }

  }
