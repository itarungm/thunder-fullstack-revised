import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopNavbarModule } from 'src/app/shared/top-navbar/top-navbar.module';
import { RightSidebarModule } from 'src/app/shared/right-sidebar/right-sidebar.module';
import { PrimaryLeftNavbarModule } from 'src/app/shared/primary-left-navbar/primary-left-navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { NotificationHeaderModule } from '../../shared/notification-header/notification-header.module';


@NgModule({
  declarations: [ LayoutComponent ],
  imports: [
    CommonModule,
    TopNavbarModule,
    RightSidebarModule,
    PrimaryLeftNavbarModule,
    FooterModule,
    LayoutRoutingModule,
    NotificationHeaderModule
  ]
})
export class LayoutModule { }
