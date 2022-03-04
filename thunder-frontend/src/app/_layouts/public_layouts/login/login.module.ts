import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormControlTrimmerDirective } from 'src/app/directives/form-control-trimmer.directive';


@NgModule({
  declarations: [
    LoginComponent,
    FormControlTrimmerDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRouting,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class LoginModule { }
