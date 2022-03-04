import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonResponseModel } from '../models/response.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  API_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  statistics(){
    return this.http.get<CommonResponseModel>(`${this.API_URL}api/dashboard/statistics?email=${this.commonService.getUserEmail()}`)
  }
}
