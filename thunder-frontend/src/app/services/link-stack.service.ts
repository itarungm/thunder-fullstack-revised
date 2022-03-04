import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CommonService} from 'src/app/services/common.service'
import { CreateCategoryModel, CreateSubcategoryModel, DeleteCategoryModel, DeleteSubcategoryModel, UpdateCategoryNameModel, UpdateSettingModel, UpdateSubcategoryModel } from '../models/link-stack.model';
import { CommonResponseModel } from '../models/response.model';
import { CryptoService } from './crypto.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LinkStackService {
  API_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private commonService: CommonService, private _cryptoService: CryptoService) { }

  getAllLinks(){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/linkStore/getAllLinks?email=${this.commonService.getUserEmail()}`)
  }

  getAllLinksForVisitor(email: string){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/linkStore/getAllLinksForVisitors?visitor=${email}`).pipe(map((res)=>{
      if(res.success){
        res.response = this._cryptoService.decryptJson(res.response);
      }
      return res;
    }))
  }

  createCategory(payload: CreateCategoryModel){
    payload.email = this.commonService.getUserEmail()
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/linkStore/createCategory`, payload)
  }

  createSubcategory(payload: CreateSubcategoryModel){
    payload.email = this.commonService.getUserEmail()
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/linkStore/createSubcategory`, payload)
  }

  updateCategoryName(payload: UpdateCategoryNameModel){
    payload.email = this.commonService.getUserEmail()
    return this.http.put<CommonResponseModel>(`${this.API_URL}api/linkStore/updateCategoryName`, payload)
  }

  updateSubcategoryLink(payload: UpdateSubcategoryModel){
    payload.email = this.commonService.getUserEmail();
    return this.http.put<CommonResponseModel>(`${this.API_URL}api/linkStore/updateSubcategoryLink`, payload)
  }

  deleteCategory(payload: DeleteCategoryModel){
    payload.email = this.commonService.getUserEmail();
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/linkStore/deleteCategory`, payload)
  }

  deleteSubcategory(payload: DeleteSubcategoryModel){
    payload.email = this.commonService.getUserEmail();
    return this.http.post<CommonResponseModel>(`${this.API_URL}api/linkStore/deleteSubcategory`, payload)
  }

  getSettings(id: string){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/linkStore/getSettings?id=${id}`).pipe(
      map((res)=>{
        if(res.success && res.response.password){
          res.response.password = this._cryptoService.decryptData(res.response.password)
        }
        return res
      })
    )
  }

  updateSettings(payload: UpdateSettingModel){
    payload.password = this._cryptoService.encryptData(payload.password);
    if(payload.isShareable){
      payload.shareLink = `${environment.LINK_TREE_VIEWER_URL}/${payload.id}`
    }
    return this.http.put<CommonResponseModel>(`${this.API_URL}api/linkStore/updateSettings?id=${payload.id}`, payload)
  }

}
