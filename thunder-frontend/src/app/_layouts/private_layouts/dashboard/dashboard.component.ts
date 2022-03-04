import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/auth.model';
import { DashboardStatistics } from 'src/app/models/dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string;
  todayDate: Date = new Date();
  dashboardStatistics: DashboardStatistics = new DashboardStatistics();
  constructor(private _localStorageService: LocalStorageService, private toastrService: NgxToasterService, private dashboardService: DashboardService) { 
    
    const userDetails = this._localStorageService.getUserDetails()
    if(userDetails){
      this.userName = userDetails.username
    }

    this.getDashboardStatistics()
  }

  ngOnInit(): void {
  }

  
  getDashboardStatistics(){
    this.dashboardService.statistics().subscribe((res)=>{
      if(res.success){
       let data =  res.response;
        const today = new Date().getDate().toString();
        let count = 0;
        data.totalViews.forEach((item: any)=>{
          const date = new Date(item.time).getDate().toString();
          if(today===date){
            count++
          }
        });
        this.dashboardStatistics={
          totalViews: data.totalViews.length,
          todayViews: count,
          uploadCount: data.uploadCount,
          passwordProtectedCount: data.passwordProtected
        }
      }else{
        this.toastrService.showError('Failed to fetch')
      }
    })
  }
  

}
