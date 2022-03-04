import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkStackComponent } from './link-stack.component';

const routes: Routes = [
  {
    path:'',
    component: LinkStackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkStackRoutingModule { }
