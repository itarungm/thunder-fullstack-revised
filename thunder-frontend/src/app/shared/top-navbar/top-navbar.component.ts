import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonCssSwitchService } from 'src/app/services/common-css-switch.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'thunder-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  name: string;
  @Output() navbarChanged = new EventEmitter();
  constructor(private _cssSwitchService: CommonCssSwitchService, private commonService: CommonService, private _authService: AuthService ) { 
    this.name = this.commonService.getUserName();
  }
  
  ngOnInit(): void {
  }

  onNavbarClick(){
    this._cssSwitchService.leftMenuSwitch();
    let isNavbarOpen: boolean;
    if(document.body.classList.contains('sidebar-icon-only')){
      isNavbarOpen = false
    }else {
      isNavbarOpen = true
    }
    this.navbarChanged.emit(isNavbarOpen);
  }

  rightSidebarOnSmallScreen(){
    this._cssSwitchService.rightMenuOnSmallScreen();
  }

  onRightSidePopup(){
   this._cssSwitchService.rightSidePopupSwitch();
  }

  onLogOut(){
    this._authService.logOut();
  }


}
