import { Component, OnInit } from '@angular/core';
import { ActionType } from 'src/app/enums/action-type.enum';
import { ActionModel } from 'src/app/models/common.model';
import { GenerateLinkModel } from 'src/app/models/file-share.model';
import { AllFilesResponseModel, ChangeFileProtectionModel, FileDeleteModel, FilesResponse } from 'src/app/models/file.model';
import { CommonService } from 'src/app/services/common.service';
import { FileShareService } from 'src/app/services/file-share.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'thunder-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  file: any;
  email: string;
  files: FilesResponse[] = [];
  dropzoneFiles: File[] = [];
  filePreviewUrl: any;
  fileSelected: boolean = false;
  fileName: string;
  filesLoader: boolean = false;
  gridHeaders: any[] = [];
  constructor(private _localStorageService: LocalStorageService, private commonService: CommonService, private toastrService: NgxToasterService, private _uploadService: UploadService, private _fileShareService: FileShareService) {
    this.email = this.commonService.getUserEmail();
    this.gridHeaders = [
      {
        title: 'File',
        class: ''
      },
      {
        title: 'Name',
        class: ''
      },
      {
        title: 'Password Protection',
        class: ''
      },
      {
        title: 'Action',
        class: 'text-center'
      }
    ]
  }

  ngOnInit(): void {
    this.getAllFiles();
  }



  cancelUpload() {
    this.fileSelected = false;
    this.dropzoneFiles.length = 0;
  }

  onSelect(event: any) {
    console.log(event);
    this.dropzoneFiles.push(...event.addedFiles);
    this.fileName = this.dropzoneFiles[0].name.split('.')[0];
    this.fileSelected = true;
    if (this.dropzoneFiles[0].type.includes('image')) {
      const file = this.dropzoneFiles[0];
      const reader = new FileReader();
      reader.onload = e => this.filePreviewUrl = reader.result;
      reader.readAsDataURL(file);
    } else if (this.dropzoneFiles[0].type.includes('pdf')) {
      this.filePreviewUrl = "../../../assets/file-types/pdf.jpg";
    } else if (this.dropzoneFiles[0].name.includes('doc')) {
      this.filePreviewUrl = "../../../assets/file-types/doc.jpg"
    } else if (this.dropzoneFiles[0].name.includes('xls')) {
      this.filePreviewUrl = "../../../assets/file-types/excel.png"
    } else if (this.dropzoneFiles[0].name.includes('txt')) {
      this.filePreviewUrl = "../../../assets/file-types/text.jpg"
    }


  }

  onRemove() {
    this.fileSelected = false;
    this.dropzoneFiles.length = 0;
  }


  onUpload() {
    let formData = new FormData();
    formData.append('file', this.dropzoneFiles[0]);
    formData.append('filename', this.dropzoneFiles[0].name);
    formData.append('email', this.commonService.getUserEmail())
    formData.append('type', this.dropzoneFiles[0].type)
    console.log(formData);
    console.log(this.commonService.getUserEmail());
    this._uploadService.uploadFile(formData).subscribe((res) => {
      if (res.success) {
        this.getAllFiles();
        this.toastrService.showSuccess(res.message);
        this.onRemove();
      } else {
        this.toastrService.showError(res.message);
      }
    })

  }


  onAction(eventDetails: ActionModel) {
    switch (eventDetails.actionType) {
      case ActionType.PASSWORD:
        this.onPasswordProtectionChange(eventDetails.payload);
        break;
      case ActionType.DELETE:
        this.onFileDelete(eventDetails.payload);
        break;
      case ActionType.LINK_GENERATE:
        console.log(eventDetails.payload)
        this.generateShareableLink(eventDetails.payload)
        // this.onFileDelete(eventDetails.payload);
        break;
      default:
        break;
    }
  }

  onPasswordProtectionChange(eventDetails: any) {
    let protectionChanged: ChangeFileProtectionModel = {
      id: this.files[eventDetails.index]._id,
      email: this.email,
      protected: eventDetails.checkedStatus,
      password: eventDetails.checkedStatus ? eventDetails.password : null
    };

    this._uploadService.changePasswordProtection(protectionChanged).subscribe((res) => {
      if (res) {
        this.getAllFiles();
      }
    })
  }

  onFileDelete(eventDetails: any) {
    console.log(eventDetails);
    let payload: FileDeleteModel = {
      id: eventDetails._id,
      email: this.email,
      name: eventDetails.fileurl,
      linkGenerated: eventDetails.linkGenerated
    }
    this._uploadService.deleteFile(payload).subscribe((res) => {
      if (res.success) {
        this.toastrService.showSuccess(res.message);
        this.getAllFiles();
      } else {
        this.toastrService.showError(res.message);
      }
    })
  }

  getAllFiles() {
    this.filesLoader = true;
    this._uploadService.getAllFiles({ email: this.email }).subscribe((res) => {
      this.filesLoader = false;
      if (res.success) {
        this.files = res.response
        this.files = this.files?.map((item) => {
          item.filetype = item.filename.split('.')[1];
          item.filename = item.filename.split('.')[0];
          return item;
        })
      } else {
        this.toastrService.showError('Failed to Fetch Files');
      }
    })
  }

  generateShareableLink(id: string){
    console.log(id);
    const reqData: GenerateLinkModel={
      id
    }
    this._fileShareService.generateLink(reqData).subscribe((res)=>{
      if(res.success){
        console.log(res);
        this.commonService.redirectToSharableLink(res.response.linkId);
        this.getAllFiles();
      }else{
        this.toastrService.showError('Failed to Generate Link!');
      }
    })
  }
}
