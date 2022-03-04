import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonCssSwitchService {

  constructor() { }

  leftMenuSwitch(){
    if ((document.body.classList.contains('sidebar-toggle-display')) || (document.body.classList.contains('sidebar-absolute'))) {
      document.body.classList.toggle("sidebar-hidden");
    } else {
      document.body.classList.toggle('sidebar-icon-only');
    }
  }

  rightSidePopupSwitch(){
    document.getElementById('right-sidebar')?.classList.toggle('open')
  }

  rightMenuOnSmallScreen(){
    document.getElementsByClassName('sidebar-offcanvas')[0].classList.toggle('active')
  }
}
