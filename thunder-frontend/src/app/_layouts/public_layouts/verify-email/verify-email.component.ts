import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonResponseModel } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private toastrService: NgxToasterService) {
    this.activatedRoute.params.subscribe(params => {
      if(params['token']){
        this.onVerifyEmail(params.token);
      }
    });
   }

   onVerifyEmail(token: string){
     this.authService.verifyEmail(token).subscribe((res)=>{
       if(res.success){
        this.toastrService.showSuccess(res.message)
       }else{
        this.toastrService.showError(res.message)
       }
       this.route.navigate(['login'])
     })
   }
  ngOnInit(): void {
  }

}
