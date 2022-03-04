import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatAccordion} from '@angular/material/expansion';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DeleteCategoryModel, DeleteSubcategoryModel, UpdateCategoryNameModel, UpdateSubcategoryModel } from 'src/app/models/link-stack.model';
import { CommonService } from 'src/app/services/common.service';
import { LinkStackService } from 'src/app/services/link-stack.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { LinkAddEditDialogComponent } from './link-add-edit-dialog/link-add-edit-dialog.component';
import { LinkSettingsComponent } from './link-settings/link-settings.component';

@Component({
  selector: 'thunder-link-stack-category',
  templateUrl: './link-stack-category.component.html',
  styleUrls: ['./link-stack-category.component.scss']
})
export class LinkStackCategoryComponent implements OnInit {
  @Input() categories:any[]=[];
  @Input() rootId: string;
  @Output() updateDeleteEmitter: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isAllExpanded: boolean = false;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['<', '>'],
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(public dialog: MatDialog, private toasterService: NgxToasterService, public commonService: CommonService, private linkStoreService: LinkStackService) { }

  ngOnInit(): void {
  }


  onLinkAdd(e: any, category: any){
    e.stopPropagation();
      let dialogRef = this.dialog.open(LinkAddEditDialogComponent, {
        width: '400px',
        autoFocus: false,
        data: { addMode: true, categoryDetails: category}
      });
      document.documentElement.classList.remove("cdk-global-scrollblock");

    
      dialogRef.afterClosed().subscribe((res: boolean) => {
        if(res){
          console.log(res);
          this.updateDeleteEmitter.emit(true)
        }
      });
    
  }

  onCopyLink(link: string){
    this.commonService.copyToClipboard(link)
  }

  onEditLink(categoryId: string, link:any){
    console.log(link)
    let dialogRef = this.dialog.open(LinkAddEditDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: { addMode: false, categoryDetails: link, categoryId}
    });
    document.documentElement.classList.remove("cdk-global-scrollblock");

  
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){

        this.updateDeleteEmitter.emit(true)
      }
    });
    
  }

  onDeleteLink(categoryId: string, link: any){
    let deleteSubcategoryModel: DeleteSubcategoryModel ={
      categoryId,
      subcategoryId: link._id
    }

    this.linkStoreService.deleteSubcategory(deleteSubcategoryModel).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message)
        this.updateDeleteEmitter.emit(true)
      }else{
        this.toasterService.showError(res.message)
      }
    })
    
  }

  deleteConfirmationDialog(categoryDetails: any, linkDetails?: any){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      autoFocus: false,
    });
    document.documentElement.classList.remove("cdk-global-scrollblock");
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        if(linkDetails){
          this.onDeleteLink(categoryDetails._id,linkDetails)
        } else{
          this.onDeleteCategory(categoryDetails._id)
        }
        
      }
    });
  }

  onCategoryEdit(e: any, i: number){
    e.stopPropagation();
    // this.categories.map((item: any)=>{
    //   return item.isEdit = false
    // })
    this.categories[i].isEdit = true;

  }

  closeCategoryUpdate(i: number){

    this.categories[i].isEdit = false;
  }

  onDeleteCategory(categoryId: string){
    const deleteCategoryModel: DeleteCategoryModel = {
      categoryId
    }
    this.linkStoreService.deleteCategory(deleteCategoryModel).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.updateDeleteEmitter.emit(true);
      }else{
        this.toasterService.showError(res.message)
      }
    })
  }

  onUpdateCategoryName(categoryId: string, updatedText: string){
    console.log(updatedText)
    let updateCategoryNameModel:UpdateCategoryNameModel={
      categoryId,
      updatedName: updatedText
    }
    this.linkStoreService.updateCategoryName(updateCategoryNameModel).subscribe((res)=>{
      if(res.success){
        this.toasterService.showSuccess(res.message);
        this.updateDeleteEmitter.emit(true);
      }else{
        this.toasterService.showError(res.message)
      }
    })
  }


  onHeaderMouseEnterLeave(status: boolean, i: number){
    if(status){
      this.categories[i].showActions = true

    }else{
      this.categories[i].showActions = false

    }
  }

  onImgError(eventDetails: any, hostUrl: string){
    eventDetails.target.src = `https://ui-avatars.com/api/?name=${hostUrl}&background=6900ff&color=fff&rounded=true`
  }

  openSettingPanel(){
    let dialogRef = this.dialog.open(LinkSettingsComponent, {
      autoFocus: false,
      data:this.rootId,
      width: '800px'
    });
    document.documentElement.classList.remove("cdk-global-scrollblock");
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        
        
      }
    });
  }

  
}


