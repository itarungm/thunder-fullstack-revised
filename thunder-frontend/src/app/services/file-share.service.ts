import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenerateLinkModel } from '../models/file-share.model';
import { CommonResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {

  API_URL = environment.SERVER_URL;


  constructor(private http: HttpClient) { }

  generateLink(reqData: GenerateLinkModel){
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/link/generateLink`,reqData);
  }

  getLinkById(reqData: any ){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/link/fileByLink?id=${reqData}`);
  }
}
