import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from "rxjs/operators";
import { NgxToasterService } from '../services/ngx-toaster.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  constructor(private toastrService: NgxToasterService, private _authService: AuthService, private _localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._localStorageService.getToken();
    if(!req.url.includes('/api/auth/user')){
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next.handle(req).pipe(
      catchError(error => {
        if(error.status===403 || error.status===401){
          this._authService.logOut(false);
        }
        this.toastrService.showInterceptorError(error.message);
        return throwError(error.message);
      })
    );
  }
}


