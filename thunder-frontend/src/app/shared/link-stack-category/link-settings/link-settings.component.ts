import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateSettingModel } from 'src/app/models/link-stack.model';
import { CommonService } from 'src/app/services/common.service';
import { LinkStackService } from 'src/app/services/link-stack.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-link-settings',
  templateUrl: './link-settings.component.html',
  styleUrls: ['./link-settings.component.scss']
})
export class LinkSettingsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LinkSettingsComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public id: string, private commonService: CommonService, private linkStackService: LinkStackService, private toasterService: NgxToasterService) { }

  isCopyLinkAvailable: boolean = false;
  settings: UpdateSettingModel = new UpdateSettingModel();
  failedToFetchSettings: boolean = false;
  toggleShowPassword: boolean = false;

  ngOnInit(): void {
    this.getLinkSettings();
  }

  getLinkSettings(){
    this.linkStackService.getSettings(this.id).subscribe((res)=>{
      if(res.success){
        this.settings = res.response;
      }else{
        this.failedToFetchSettings = true;
        this.toasterService.showError(res.message);
      }
    })
  }

  updateSetting(){
    const updateSetting: UpdateSettingModel ={
      id: this.id,
      isPasswordProtected: this.settings.isPasswordProtected,
      isShareable: this.settings.isShareable,
      password: this.settings.password,
      shareLink: this.settings.shareLink,
      isTitleAvailable: this.settings.isTitleAvailable,
      title: this.settings.title
    }

    this.linkStackService.updateSettings(updateSetting).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.getLinkSettings();
      }else{
        this.toasterService.showError(res.message);
        this.getLinkSettings();
      }
    })
  }

  copyLink(){
    this.commonService.copyToClipboard(this.settings.shareLink);
  }

  navigateToUrl(){
    window.open(this.settings.shareLink, '_blank');
  }

}
