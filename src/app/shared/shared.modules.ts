import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


@NgModule({
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
