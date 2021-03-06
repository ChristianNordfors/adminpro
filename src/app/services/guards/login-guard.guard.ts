import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {



  constructor( public _usuarioService: UsuarioService,
               public router: Router ) {
  }

  canActivate() {

    if ( this._usuarioService.estaLogueado() ){
      // console.log( 'PASO EL GUARD');
      return true;
    } else {
      console.log( 'BLOQUEADO POR GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
