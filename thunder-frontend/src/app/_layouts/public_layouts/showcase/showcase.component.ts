import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';
import { FileShareService } from 'src/app/services/file-share.service';
import { environment } from 'src/environments/environment';
import { validate as uuidValidator } from 'uuid';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'thunder-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  public id: string;
  public password: FormControl = new FormControl(null,Validators.required);
  public isFailedToFetchFile: boolean = false;
  public isInvalidLink: boolean = false;
  public isPasswordProtected: boolean = false;
  public file: any;
  public openSecretViewer: boolean = false;
  public email: string;
  constructor(private commonService: CommonService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private _fileShareService: FileShareService, private _cryptoService: CryptoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.id = id
    }

    if(uuidValidator(this.id)){
      this.getFile();
    } else {
      this.isInvalidLink = true;
    }
  }

  getFile(){
    this._fileShareService.getLinkById(this.id).subscribe((res)=>{
      if(res.success){
        this.isPasswordProtected = res.response.isPasswordProtected;

        if(!this.isPasswordProtected){
      this.openSecretViewer = true;
        }
        this.file = res.response;
        this.email = res.response.email;
        this.file.fileType = this._cryptoService.decryptData(res.response.fileType)
        this.file.fileUrl = this._cryptoService.decryptData(res.response.fileUrl);
        this.file['url']=`${environment.IMAGE_HOST_URL}${this.email}/${this.file.fileUrl}`
        if(this.file.fileType.includes('image')){
          this.file.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.file.url)
        }
       this.commonService.copyToClipboard(location.href);
      }else{
        this.isFailedToFetchFile = true;
      }
    })
  }

  onPasswordSubmit(){
    if(this._cryptoService.decryptData(this.file.docPassword)===this.password.value){
      this.openSecretViewer = true;
      this.isPasswordProtected=false;
    }else{
      this.openSecretViewer = false;
      document.getElementById('password')?.classList.add('shake');
      setTimeout(() => {
        document.getElementById('password')?.classList.remove('shake')
      }, 500);
    }

 
  }

}
