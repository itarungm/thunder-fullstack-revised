import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [DeleteConfirmationComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[DeleteConfirmationComponent]
})
export class DeleteConfirmationModule { }
