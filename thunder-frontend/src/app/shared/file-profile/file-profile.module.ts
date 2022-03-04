import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileProfileComponent } from './file-profile.component';



@NgModule({
  declarations: [
    FileProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[FileProfileComponent]
})
export class FileProfileModule { }
