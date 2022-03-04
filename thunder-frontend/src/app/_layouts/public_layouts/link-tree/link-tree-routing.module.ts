import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkTreeComponent } from './link-tree.component';

const routes: Routes = [
  {
    path: '',
    component: LinkTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkTreeRoutingModule { }
