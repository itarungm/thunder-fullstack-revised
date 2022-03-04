import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileProfileModule } from 'src/app/shared/file-profile/file-profile.module';
import { BrandLoaderModule } from 'src/app/shared/brand-loader/brand-loader.module';
import { GridModule } from 'src/app/shared/grid/grid.module';


@NgModule({
  declarations: [
    UploadsComponent
  ],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    NgxDropzoneModule,
    FileProfileModule,
    BrandLoaderModule,
    GridModule
  ]
})
export class UploadsModule { }
