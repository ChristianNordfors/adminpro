import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../service.index';
import swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public http: HttpClient,
                public _usuarioService: UsuarioService ) { }

  cargarMedicos() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
            .pipe(map( (resp: any) => {
              // console.log( resp.medicos );

              this.totalMedicos = resp.total;
              return resp.medicos;
            }))
  }

  cargarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
            .pipe(map( (resp: any) => resp.medico ));

  }

  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
            .pipe(map( (resp: any) => resp.medicos ));

  }

  borrarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
            .pipe(map( resp =>{
              return resp;
            }));

  }

  guardarMedico( medico: Medico ){

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {

      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
              .pipe(map( (resp: any) => {
                swal.fire('Médico actualizado', 'El registro se ha actualizado correctamente', 'success');
                return resp.medico;
              }));

    } else {

      url += '?token=' + this._usuarioService.token;
      // en el post envío url y medico a actualizar
      return this.http.post(url, medico)
            .pipe(map( (resp: any) =>{
              swal.fire('Médico creado', 'El registro se ha creado correctamente', 'success');
              return resp.medico
            }));
    }

  }

}
