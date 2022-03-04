import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewerComponent } from './file-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    FileViewerComponent
  ],
  imports: [
    CommonModule,
    NgxDocViewerModule
  ],
  exports:[FileViewerComponent]
})
export class FileViewerModule { }
