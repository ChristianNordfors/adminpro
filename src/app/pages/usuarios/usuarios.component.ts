import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

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
  noRegistros: boolean = false;

  constructor( public _usuarioService: UsuarioService,
                public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id: string ) {

    // el segundo argumento es el id del usuario que estoy seleccionando
    this._modalUploadService.mostrarModal( 'usuarios', id );

  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {

                console.log( resp );
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    console.log( desde );

    if( desde >= this.totalRegistros || desde < 0 ) {
      this.noRegistros = true;
      // swal.fire('No hay más registros', '', 'warning');
      return;
    } else {
      this.noRegistros = false;
    }

    // if( desde < 0 ) {
    //   return;
    // }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string) {

    if( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) =>{

              this.usuarios = usuarios;
              this.cargando = false;

            });

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ){
      swal.fire('Acción no permitida', 'No se puede eliminar a si mismo', 'error');
      return;
    }


  swal.fire({
  title: '¿Está seguro?',
  text: 'Está a punto de eliminar a ' + usuario.nombre,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  // cancelButtonColor: '#d33',
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar'
})
.then((borrar) => {

  if(borrar.value){
    this._usuarioService.borrarUsuario( usuario._id )
            .subscribe( borrado => {
              swal.fire(
                'Usuario eliminado',
                'El registro fue eliminado con éxito',
                'success'
              )
              console.log(borrado);
              this.cargarUsuarios();
            });

          } else if ( borrar.dismiss === swal.DismissReason.cancel ) {
                // swal.fire('Cancelado', 'No se ha eliminado ningún registro', 'error');
              }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();
  }

}
