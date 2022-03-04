import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateSubcategoryModel, UpdateSubcategoryModel } from 'src/app/models/link-stack.model';
import { CommonService } from 'src/app/services/common.service';
import { LinkStackService } from 'src/app/services/link-stack.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-link-add-edit-dialog',
  templateUrl: './link-add-edit-dialog.component.html',
  styleUrls: ['./link-add-edit-dialog.component.scss']
})
export class LinkAddEditDialogComponent implements OnInit {
  linkControl: FormControl = new FormControl(null,[Validators.required,this.commonService.isUrl]);
  addMode: boolean;
  categoryId: string;
  constructor(public dialogRef: MatDialogRef<LinkAddEditDialogComponent>,
    private toasterService: NgxToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any, private linkStackService: LinkStackService, private commonService: CommonService) { 
      this.addMode = data.addMode;
      if(!this.addMode){
        this.categoryId = data.categoryId;
        this.linkControl.patchValue(this.data.categoryDetails.link)
      }
    }


  ngOnInit(): void {
  }

  onLinkAddUpdate(){
    this.linkControl.markAllAsTouched();
    if(this.linkControl.invalid) return;

    if(this.addMode){
      this.addLink();
    }else{
      this.updateLink();
    }
  }

  addLink(){
    const subcategory: CreateSubcategoryModel={
      categoryId: this.data.categoryDetails._id,
      link: this.linkControl.value
    }
    this.linkStackService.createSubcategory(subcategory).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.dialogRef.close(true)
      }else{
        this.toasterService.showError(res.message);
      }
    })

  }

  updateLink(){
    const updateSubcategoryModel: UpdateSubcategoryModel = {
      categoryId: this.categoryId,
      subcategoryId: this.data.categoryDetails._id,
      subcategoryLink: this.linkControl.value
    }

    this.linkStackService.updateSubcategoryLink(updateSubcategoryModel).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.dialogRef.close(true);
      } else{
        this.toasterService.showError(res.message);
      }
    })
  }

}
