import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomQuoteModel } from '../models/random-quotes.model';
import { LocalStorageService } from './local-storage.service';
import { NgxToasterService } from './ngx-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _localStorageService: LocalStorageService,private clipboard: Clipboard, private toaster: NgxToasterService, private router: Router, private http: HttpClient) { }

  public randomQuote(){
    const QUOTES_URL = "https://api.quotable.io/random?maxLength=70";
    return this.http.get<RandomQuoteModel>(QUOTES_URL);
  }

  public isUrl(control: FormControl){
    if(!control.value) return null
    try {  
      if(Boolean(new URL(control.value))){
        return null
      }else{
        return {'invalidUrl': true}
      }
     }
    catch(e){ 
      return {'invalidUrl': true}
     }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public getUserEmail(){
    return this._localStorageService.getUserDetails()?.email;
  }

  public getUserName(){
    console.log(this._localStorageService.getUserDetails());
    return this._localStorageService.getUserDetails()?.name;
  }

  public redirectToSharableLink(id: string){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/share/${id}`])
    );
    this.clipboard.copy(`${location.host}/share/${id}`);
    this.toaster.showSuccess('Link Copied')
    window.open(url, '_blank');
  }

  public copyToClipboard(text: any){
    if(!text) return
    text = text.toString();
    this.clipboard.copy(text);
    this.toaster.showSuccess('Link Copied')
  }

}
