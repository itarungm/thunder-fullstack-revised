import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import { RouterModule } from '@angular/router';
import { BellNotificationModule } from '../bell-notification/bell-notification.module';



@NgModule({
  declarations: [
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    BellNotificationModule,
    RouterModule
  ],
  exports:[
    TopNavbarComponent
  ]
})
export class TopNavbarModule { }
