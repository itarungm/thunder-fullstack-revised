import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public tokenKeyName: string = 'token';
  public userDetails: string = 'user';
  constructor(private _cryptoService: CryptoService) { }

  setToken(token: string) {
    localStorage.setItem(this.tokenKeyName, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKeyName);
  }

  setUserDetails(data: any) {
    localStorage.setItem(this.userDetails, this._cryptoService.encryptData(data))
  }

  getUserDetails() {
    const userDetails = localStorage.getItem(this.userDetails);
    if (userDetails) {
      try {
        return this._cryptoService.decryptData(userDetails)
      } catch{
        return null;
      }
    } else {
      return null;
    }
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

}
