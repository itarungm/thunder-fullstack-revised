import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkTreeRoutingModule } from './link-tree-routing.module';
import { LinkTreeComponent } from './link-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LinkTreeComponent
  ],
  imports: [
    CommonModule,
    LinkTreeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LinkTreeModule { }
