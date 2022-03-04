import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLeftNavbarComponent } from './primary-left-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PrimaryLeftNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[PrimaryLeftNavbarComponent]
})
export class PrimaryLeftNavbarModule { }
