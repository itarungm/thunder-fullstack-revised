import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarComponent } from './right-sidebar.component';



@NgModule({
  declarations: [
    RightSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RightSidebarComponent
  ]
})
export class RightSidebarModule { }
