import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangePassword, ForgotPassword, LoginResponseModel, RegistrationResponseModel, User } from '../models/auth.model';
import { CryptoService } from './crypto.service';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CommonResponseModel } from '../models/response.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.SERVER_URL;
  VERIFICATION_URL = environment.VERIFICATION_URL;
  helper = new JwtHelperService();

  constructor(private http: HttpClient,private cookieService: CookieService, private _cryptoService: CryptoService, private _localStorageService: LocalStorageService, private route: Router) { }

  checkUsername(userName: string){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/common/checkUsername?reqUsername=${userName}`)
  }

  userRegistration(registrationDetails: User){
    registrationDetails.verificationUrl = this.VERIFICATION_URL;
    registrationDetails.password = this._cryptoService.encryptData(registrationDetails.password);
    return this.http.post<RegistrationResponseModel>(`${this.API_URL}api/auth/user/register`,registrationDetails)
  }

  userLogin(loginDetails: User){
    loginDetails.password = this._cryptoService.encryptData(loginDetails.password);
    return this.http.post<LoginResponseModel>(`${this.API_URL}api/auth/user/login`,loginDetails)
  }

  verifyEmail(token: string){
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/auth/user/verifyEmail`,{token})
  }

  generateForgotPasswordLink(reqData: ForgotPassword){
    reqData.verificationUrl = environment.FORGOT_PASSWORD_URL;
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/forgotPassword/generateLink`,reqData)
  }

  resetPassword(reqData: any){
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/forgotPassword/resetEmail`,reqData)
  }

  changePassword(reqData: ChangePassword){
    reqData.password = this._cryptoService.encryptData(reqData.password);
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/forgotPassword/changePassword`,reqData)
  }

  isAuthenticated(){
    const token = this._localStorageService.getToken();
    if(token){
      try{
        const  isTokenExpired: boolean = this.helper.isTokenExpired(token)
        return ((this.helper.decodeToken(token) as any)?.email && (!isTokenExpired));
      } catch{
        this._localStorageService.clearStorage();
        return false;
      }
      
    }else{
      this._localStorageService.clearStorage();
      return false;
    }

  }

  clearRememberMeDetails(){
    this.cookieService.delete('username')
    this.cookieService.delete('password')
  }

  logOut(clearRememberMeDetails: boolean = true){
    this._localStorageService.clearStorage();
    this.route.navigate(['/login']);
    if(clearRememberMeDetails){
      this.clearRememberMeDetails();
    }
  }
}
