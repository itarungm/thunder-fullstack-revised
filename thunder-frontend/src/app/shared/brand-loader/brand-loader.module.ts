import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandLoaderComponent } from './brand-loader.component';



@NgModule({
  declarations: [
    BrandLoaderComponent,
    BrandLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BrandLoaderComponent
  ]
})
export class BrandLoaderModule { }
