import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { CreateCategoryModel } from 'src/app/models/link-stack.model';
import { CommonService } from 'src/app/services/common.service';
import { LinkStackService } from 'src/app/services/link-stack.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-link-stack',
  templateUrl: './link-stack.component.html',
  styleUrls: ['./link-stack.component.scss']
})
export class LinkStackComponent implements OnInit {
  allCategories:[]
  categoryControl: FormControl = new FormControl(null, [Validators.required]);
  rootId: string;
  constructor(private linkStackService: LinkStackService, private toasterService: NgxToasterService) { }

  ngOnInit(): void {
    this.getAllLinks();
  }


  onCategorySubmit(){
    this.categoryControl.markAsTouched();
    if(this.categoryControl.invalid) return;
    const category: CreateCategoryModel ={
      categoryName: this.categoryControl.value
    }
    this.linkStackService.createCategory(category).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.getAllLinks();
        this.categoryControl.reset();
      }else{
        this.toasterService.showError(res.message);
      }
    })
  }

  getAllLinks(){
    this.linkStackService.getAllLinks().pipe(map((res)=>{
      if(!res.success) return res;
      res.response.categoryList=res?.response?.categoryList?.map((item: any)=>{
        item['isEdit']=false;
        item['showActions']=false;
        return item
      })
      return res;
    })).subscribe((res)=>{
      if(res.success){
        this.rootId = res.response?.id;
        this.allCategories = res.response?.categoryList;
      }else{
        this.toasterService.showError(res.message);
      }
    })
  }

  onUpdateDelete(eventDetails: boolean){
    if(eventDetails){
      this.getAllLinks();
    }
  }


}
