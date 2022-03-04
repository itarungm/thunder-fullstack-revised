import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../../models/auth.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'thunder-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isNavbarOpen: boolean = true;
  userDetails: UserDetails;

  constructor(private route: Router, private fileService: UploadService, private _localStorageService: LocalStorageService) { 
    if(route.url=='/'){
      this.route.navigate(['dashboard'])
    }
    if(document.body.classList.contains('sidebar-icon-only')){
      this.isNavbarOpen = false
    }
  }

  ngOnInit(): void {
    this.getUploadLimitDetails();
    this.userDetails = this._localStorageService.getUserDetails()

  }

  getUploadLimitDetails(){
    this.fileService.uploadLimitDetails().subscribe((res)=>{
      if(res.success){
        this.userDetails = res.response;
      } 
    })
  }

  onNavbarChangeStatus(eventDetails: boolean){
    this.isNavbarOpen = eventDetails;
  }


}
