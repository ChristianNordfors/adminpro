import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
      RouterModule,
      CommonModule,
      PipesModule
  ],
    declarations: [
      BreadcrumbsComponent,
      HeaderComponent,
      NopagefoundComponent,
      SidebarComponent
    ],
    exports: [
      BreadcrumbsComponent,
      HeaderComponent,
      NopagefoundComponent,
      SidebarComponent
    ]
})

export class SharedModule { }
