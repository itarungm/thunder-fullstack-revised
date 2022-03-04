import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path:'uploads',
        loadChildren: () => import('./uploads/uploads.module').then(m => m.UploadsModule),
        canActivate:[AuthGuard]
      },
      {
        path:'link-store',
        loadChildren: () => import('./link-stack/link-stack.module').then(m => m.LinkStackModule),
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
