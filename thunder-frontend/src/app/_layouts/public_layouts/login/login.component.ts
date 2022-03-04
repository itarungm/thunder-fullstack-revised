import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseModel, RegistrationResponseModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { CommonResponseModel } from 'src/app/models/response.model';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from 'src/app/services/crypto.service';
import { CommonCssSwitchService } from 'src/app/services/common-css-switch.service';
@Component({
  selector: 'thunder-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public signUpPanel: boolean = false;
  public signUpForm: FormGroup;
  public loginForm: FormGroup;
  public isUsernameAvailable: boolean | string ='default';
  public usernameCheckingLoader: boolean;
  public isRememberMeChecked: boolean = false;
  constructor(private fb: FormBuilder, 
    private route: Router,
    private commonService: CommonService, 
    private _localStorageService: LocalStorageService,
    private authService: AuthService,
    private toastrService: NgxToasterService,
    private cookieService: CookieService,
    private cryptoService: CryptoService) { 
      
      if(this.authService.isAuthenticated()){
        this.route.navigate(['dashboard'])
      }
      if(this.cookieService.get('username') && this.cookieService.get('password')){
        this.isRememberMeChecked = true;
      }
    }

  ngOnInit(): void {
    if(this.route.url.includes('login')){
      this.activeSignInPanel();
    }else{
      this.activeSignUpPanel();
    }
    this.initializeForms();
  }

  initializeForms(){
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, this.commonService.noWhitespaceValidator]],
      name: ['', [Validators.required, this.commonService.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, this.commonService.noWhitespaceValidator]],
      password: ['', [Validators.required, this.commonService.noWhitespaceValidator]],
      terms: [false, [Validators.requiredTrue]],
      url: [''],
    })

    this.loginForm = this.fb.group({
      username: [this.isRememberMeChecked?(this.cryptoService.decryptData(this.cookieService.get('username'))):null, [Validators.required, this.commonService.noWhitespaceValidator]],
      password: [this.isRememberMeChecked?(this.cryptoService.decryptData(this.cookieService.get('password'))):null, [Validators.required]],
    })
  }

  ngAfterViewInit(){
    this.signUpForm.controls['username'].valueChanges.pipe(filter(term=>term?.trim()),debounceTime(400),distinctUntilChanged()).subscribe((term)=>{

        this.usernameCheckingLoader = true;
        this.checkUsername(term);
      
    })
  }

  onSignUp() {
    this.loginForm.reset();
    console.log(this.signUpForm);
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid || !this.isUsernameAvailable) return;

    this.authService.userRegistration(this.signUpForm.value).subscribe((res: RegistrationResponseModel) => {
      if (res.success) {
        this.toastrService.showSuccess(`Voila! ${res.response.name.split(' ')[0]}, Account Created!`);
        this.signUpForm.reset();
        this.route.navigate(['login'])
      } else {
        this.toastrService.showError(res.message);
      }
    })

  }

  onLogin() {
    this.signUpForm.reset();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    if(this.isRememberMeChecked){
      this.cookieService.set('username', this.cryptoService.encryptData(this.loginForm.value.username));  
      this.cookieService.set('password', this.cryptoService.encryptData(this.loginForm.value.password));  
    } else  {
      this.authService.clearRememberMeDetails();
    }
    this.authService.userLogin(JSON.parse(JSON.stringify(this.loginForm.value))).subscribe((res: LoginResponseModel) => {
      if(res.success){
        this.toastrService.showSuccess(`Logged In`);
        this._localStorageService.setToken(res?.token);
        this._localStorageService.setUserDetails(res?.response);
        this.route.navigate(['dashboard'])
      }else{
        this.toastrService.showError(res.message);
      }
    })  
  }


  checkUsername(userName: string){
    this.authService.checkUsername(userName).subscribe((res: CommonResponseModel) => {
      this.usernameCheckingLoader = false; 
      if(res.success){
        this.isUsernameAvailable = res.response.isAvailable;
      }else{
        this.toastrService.showError(res.message);
      }
    }) 
  }

  
  onRememberMe(eventDetails: any){
    this.isRememberMeChecked = eventDetails.target.checked;
    if(!this.loginForm.value.username || !this.loginForm.value.password){
      this.loginForm.markAllAsTouched();
      return;
    }
    if(eventDetails.target.checked){
      this.cookieService.set('username', this.cryptoService.encryptData(this.loginForm.value.username));  
      this.cookieService.set('password', this.cryptoService.encryptData(this.loginForm.value.password));  
    } else  {
      this.authService.clearRememberMeDetails();
    }
  }


  activeSignUpPanel() {
    this.signUpPanel = true;
  }

  activeSignInPanel() {
    this.signUpPanel = false;
  }

}
