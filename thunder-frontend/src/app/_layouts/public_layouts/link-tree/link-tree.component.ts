import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAllLinksForVisitors } from 'src/app/models/link-stack.model';
import { CryptoService } from 'src/app/services/crypto.service';
import { LinkStackService } from 'src/app/services/link-stack.service';
import { NgxToasterService } from 'src/app/services/ngx-toaster.service';

@Component({
  selector: 'thunder-link-tree',
  templateUrl: './link-tree.component.html',
  styleUrls: ['./link-tree.component.scss'],
})
export class LinkTreeComponent implements OnInit {
  linkDetails: GetAllLinksForVisitors;
  isPasswordValidated: boolean = false;
  isInvalidLink: boolean = false;
  isFailedToFetchFile: boolean = false;
  id: string;
  password: FormControl = new FormControl(null,Validators.required);

  constructor(
    private linkStackService: LinkStackService,
    private router: ActivatedRoute,
    private toasterService: NgxToasterService,
    private cryptoService: CryptoService,
    private titleService:Title
  ) {
    try {
      const id = this.router.snapshot.paramMap.get('id');
      if (id) {
        this.id = id;
        this.isInvalidLink = false;
      }
    } catch {
      this.isInvalidLink = true;
    }
  }

  ngOnInit(): void {
    if (!this.isInvalidLink) {
      this.getAllLinks();
    }
  }

  getAllLinks() {
    this.linkStackService.getAllLinksForVisitor(this.id).subscribe((res) => {
      if (res.success) {
        if (!res.response.isShareable) {
          this.isInvalidLink = true;
        } else {
          this.linkDetails = res.response;
          if (!this.linkDetails.isPasswordProtected) {
            this.isPasswordValidated = true;
            this.setTitle((this.linkDetails.title)?(this.linkDetails.title):'Thunder Tree')
          }
        }
      } else {
        this.isFailedToFetchFile = true;
        this.toasterService.showError(res.message);
      }
    });
  }

  onPasswordSubmit(){
    if(this.cryptoService.decryptData(this.linkDetails.password)===this.password.value){
      this.isPasswordValidated=true;
      this.linkDetails.isPasswordProtected = false;
      this.setTitle((this.linkDetails.title)?(this.linkDetails.title):'Thunder Tree')
    }else{
      this.isPasswordValidated = false;
      this.linkDetails.isPasswordProtected = true;
      document.getElementById('password')?.classList.add('shake');
      setTimeout(() => {
        document.getElementById('password')?.classList.remove('shake')
      }, 500);
    }

 
  }

  navigateToLink(link: string){
    window.open(link,'_blank')
  }

  onImgError(eventDetails: any, hostUrl: string){
    eventDetails.target.src = `https://ui-avatars.com/api/?name=${hostUrl}&background=6900ff&color=fff&rounded=true`
  }

  setTitle(title='Thunder Tree'){
    this.titleService.setTitle(title);
  }
}
