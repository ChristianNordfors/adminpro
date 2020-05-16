import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link ); // Pasa por referenicia el link a aplicarCheck
                                // asi aplicarCheck se ocupa unicamente de una tarea
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector'); // Arreglo de selectores

    for( let ref of selectores ) {
      ref.classList.remove('working');
    }
    // Luego de haber removido todas las clases working
    // la aplica en la seleccionada
    link.classList.add('working');

  }

  colocarCheck( ) {

    let selectores: any = document.getElementsByClassName('selector'); // Arreglo de selectores

    let tema = this._ajustes.ajustes.tema;

    for( let ref of selectores ) {
      if( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
