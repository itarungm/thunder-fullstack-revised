import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ChangePassword, ForgotPassword } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public isLinkAvailable: boolean = false;
  public resetPassword: boolean = false;
  public emailControl : FormControl = new FormControl(null,[Validators.required, Validators.email])
  public resetForm: FormGroup;
  public tokenFromParam: string;
  constructor(private route: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private commonService: CommonService, private authService: AuthService, private toastrService: NgxToasterService) {
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.tokenFromParam = params.id
        this.isLinkAvailable = true;
        this.onForgotPasswordToken(params.id);
        // this.spinner.show();
      }
    });
   }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: new FormControl(null,Validators.required),
      confirmPassword: new FormControl(null,Validators.required),
    })
  }

  get resetFormControls(){
    return this.resetForm.controls
  }

  onEmailSubmit(){
    const details: ForgotPassword ={
      email: this.commonService.getUserEmail(),
    }
    this.authService.generateForgotPasswordLink(details).subscribe((res)=>{
      if (res.success) {
        this.toastrService.showSuccess(res.message);
        this.route.navigate(['login'])
      } else {
        this.toastrService.showError(res.message);
      }
    })
  }


  onForgotPasswordToken(token: string){
    const reqData ={
      email: this.commonService.getUserEmail(),
      token
    }
    this.authService.resetPassword(reqData).subscribe((res)=>{
      if (res.success) {
        this.toastrService.showSuccess(res.message);
        this.isLinkAvailable = false;
        this.resetPassword = true;
      } else {
        this.toastrService.showError(res.message);
        this.route.navigate(['login'])
      }
    })
  }

  changePassword(){
    const data: ChangePassword ={
      token: this.tokenFromParam,
      password: this.resetForm.value.password
    }
    this.authService.changePassword(data).subscribe((res)=>{
      if (res.success) {
        this.toastrService.showSuccess(res.message);
      } else {
        this.toastrService.showError(res.message);
      }
      this.route.navigate(['login'])
    })
  }
}
