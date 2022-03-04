import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllFilesResponseModel, ChangeFileProtectionModel, FileDeleteModel, FileUploadResponseModel } from '../models/file.model';
import { CommonResponseModel } from '../models/response.model';
import { CommonService } from './common.service';
import { CryptoService } from './crypto.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  API_URL = environment.SERVER_URL;


  constructor(private http: HttpClient, private cryptoService: CryptoService, private commonService: CommonService) { }

  uploadFile(data: FormData){
    return this.http.post<FileUploadResponseModel>(`${this.API_URL}api/file/upload`,data)
  }

  deleteFile(data: FileDeleteModel){
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/file/delete`,data)
  }

  getAllFiles(data: any){
    return this.http.post<AllFilesResponseModel>(`${this.API_URL}api/file/files`,data)
  }

  changePasswordProtection(data: ChangeFileProtectionModel){
    data.password = this.cryptoService.encryptData(data.password);
    return this.http.put<CommonResponseModel>(`${this.API_URL}api/file/changeProtection`,data)
  }

  uploadLimitDetails(){
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/file/uploadLimitDetails`,{email: this.commonService.getUserEmail()})
  }
}
