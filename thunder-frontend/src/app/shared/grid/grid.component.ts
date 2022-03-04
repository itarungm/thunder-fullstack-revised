import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActionType } from 'src/app/enums/action-type.enum';
import { ActionModel } from 'src/app/models/common.model';
import { CommonService } from 'src/app/services/common.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() gridData: any;
  @Input() loader: any;
  @Input() gridHeaders: any;
  @Output() action: EventEmitter<ActionModel> = new EventEmitter();

  actionType: ActionType;
  checkedStatus:boolean[]=[];
  selectedIndexForPasswordChange: number;
  selectedFileForDelete: any;

  password: FormControl = new FormControl(null,Validators.required);
  @ViewChild('passwordBox') passwordBox:any;
  @ViewChild('confirmBox') confirmBox:any;

  constructor(private clipboard: Clipboard, public dialog: MatDialog, private _commonService: CommonService, private toasterService: NgxToasterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes?.gridData?.currentValue?.length){
      changes.gridData.currentValue.forEach((item: any,i: number)=>{
        this.checkedStatus[i] = item.ispasswordprotected
      })
      console.log(this.checkedStatus);

    }

  }

  ngOnInit(): void {
    console.log(this.password);
    console.log(this.gridData);
  }

  openPasswordChangeDialog(index: number){
    this.selectedIndexForPasswordChange=index;
    console.log(this.checkedStatus[index])
    const status = this.checkedStatus[index];
    if(status){
      this.dialog.open(this.passwordBox,{
        width:'250px'
      }).afterClosed().subscribe((res)=>{
        if(!res){
          this.checkedStatus[index]=false
          this.password.reset();
        }
      })
    } else {
      this.checkedStatus[this.selectedIndexForPasswordChange]=false
      this.action.emit({actionType:ActionType.PASSWORD,payload:{index:this.selectedIndexForPasswordChange,checkedStatus:false}});
    }

  }

  changePassword(){
    this.checkedStatus[this.selectedIndexForPasswordChange]=this.checkedStatus[this.selectedIndexForPasswordChange];
    this.action.emit({actionType:ActionType.PASSWORD,payload:{index:this.selectedIndexForPasswordChange,checkedStatus:this.checkedStatus[this.selectedIndexForPasswordChange], password:this.password.value}});
    this.dialog.closeAll();
  }


  onDeleteConfirmation(file: any){
    this.selectedFileForDelete = file;
    this.dialog.open(this.confirmBox,{
      width:'300px'
    })
    document.documentElement.classList.remove("cdk-global-scrollblock");
  }

  onFileDelete(){
    this.action.emit({actionType: ActionType.DELETE,payload:this.selectedFileForDelete});
    this.dialog.closeAll();
  }


  onLinkGenerate(file: any){
    if(file.linkGenerated){
      this._commonService.redirectToSharableLink(file.shareableLink)
    }else{
      this.action.emit({actionType: ActionType.LINK_GENERATE,payload:file._id});
    }
  }

  copyLink(id: string){
    const link = `${location.host}/share/${id}`
    this.clipboard.copy(link);
    this.toasterService.showSuccess('Link Copied')
  }
}
