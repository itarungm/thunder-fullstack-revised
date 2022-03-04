import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NgxToasterService {

  constructor(private toastrService: ToastrService) { }


  showInterceptorError(errorData: HttpErrorResponse){
    this.toastrService.error(errorData.message, 'Error', {
      timeOut: 3000,
    });
  }

  showSuccess(successData: string){
    this.toastrService.success(successData, 'Success', {
      timeOut: 3000,
    });
  }

  
  showError(errorData: string){
    this.toastrService.error(errorData, 'Error', {
      timeOut: 3000,
    });
  }

  
}
