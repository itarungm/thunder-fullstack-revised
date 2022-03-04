import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkStackRoutingModule } from './link-stack-routing.module';
import { LinkStackComponent } from './link-stack.component';
import { LinkStackCategoryModule } from 'src/app/shared/link-stack-category/link-stack-category.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    LinkStackComponent
  ],
  imports: [
    CommonModule,
    LinkStackRoutingModule,
    LinkStackCategoryModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class LinkStackModule { }
