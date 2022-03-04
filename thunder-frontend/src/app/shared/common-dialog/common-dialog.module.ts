import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from './common-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'


@NgModule({
  declarations: [ CommonDialogComponent ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class CommonDialogModule { }
