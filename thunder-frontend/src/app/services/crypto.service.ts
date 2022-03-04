import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private encryptSecretKey = environment.SECRET;
  private JsonDecryptKey = environment.JSON_CRYPTO_SECRET;

  constructor() { }

  encryptData(data: string) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      return data
    }
  }

  decryptData(data: string) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return data;
    }
  }

  decryptJson(data: string){
    try {
      const deData= CryptoJS.AES.decrypt(decodeURIComponent(data), this.encryptSecretKey); 
      if (deData.toString()) {
        return JSON.parse(deData.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return data;
    }
  }
}
