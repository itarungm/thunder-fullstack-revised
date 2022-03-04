import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ShowcaseComponent } from './showcase.component';
import { FileViewerModule } from 'src/app/shared/file-viewer/file-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShowcaseComponent
  ],
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    FileViewerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShowcaseModule { }
