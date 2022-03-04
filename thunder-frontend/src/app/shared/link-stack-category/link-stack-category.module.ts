import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkStackCategoryComponent } from './link-stack-category.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';
import { LinkAddEditDialogComponent } from './link-add-edit-dialog/link-add-edit-dialog.component';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LinkSettingsComponent } from './link-settings/link-settings.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    LinkStackCategoryComponent,
    LinkAddEditDialogComponent,
    LinkSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule,
    MatCardModule,
    DeleteConfirmationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  exports:[
    LinkStackCategoryComponent
  ]
})
export class LinkStackCategoryModule { }
