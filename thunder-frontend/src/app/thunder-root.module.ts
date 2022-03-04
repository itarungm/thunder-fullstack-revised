import {  NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThunderRootRouting } from './thunder-root-routing.module';
import { ThunderRootComponent } from './thunder-root.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsInterceptor } from './interceptors/https.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    ThunderRootComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ThunderRootRouting,
    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    {
      // processes all errors
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true
    },
  ],
  bootstrap: [ThunderRootComponent]
})
export class ThunderRootModule { }
