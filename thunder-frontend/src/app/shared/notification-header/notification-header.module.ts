import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHeaderComponent } from './notification-header.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [NotificationHeaderComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports:[NotificationHeaderComponent]
})
export class NotificationHeaderModule { }
