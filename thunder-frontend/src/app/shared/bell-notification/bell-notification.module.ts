import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellNotificationComponent } from './bell-notification.component';



@NgModule({
  declarations: [
    BellNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[BellNotificationComponent]
})
export class BellNotificationModule { }
