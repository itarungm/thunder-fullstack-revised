import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { BrandLoaderModule } from '../brand-loader/brand-loader.module';
import { FileProfileModule } from '../file-profile/file-profile.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    BrandLoaderModule,
    FileProfileModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ClipboardModule
  ],
  exports:[GridComponent]
})
export class GridModule { }
