import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./_layouts/public_layouts/login/login.module').then(m => m.LoginModule),
  },
  {
    path:'signup',
    loadChildren: () => import('./_layouts/public_layouts/login/login.module').then(m => m.LoginModule),
  },
  {
    path:'verify-email/:token',
    loadChildren: () => import('./_layouts/public_layouts/verify-email/verify-email.module').then(m => m.VerifyEmailModule),
  },
  {
    path:'forgot-password',
    loadChildren: () => import('./_layouts/public_layouts/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path:'forgot-password/:id',
    loadChildren: () => import('./_layouts/public_layouts/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path:'share/:id',
    loadChildren: () => import('./_layouts/public_layouts/showcase/showcase.module').then(m => m.ShowcaseModule),
  },
  {
    path:'link-tree/:id',
    loadChildren: () => import('./_layouts/public_layouts/link-tree/link-tree.module').then(m => m.LinkTreeModule),
  },
  {
    path:'',
    loadChildren: () => import('./_layouts/private_layouts/layout.module').then(m => m.LayoutModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ThunderRootRouting { }
