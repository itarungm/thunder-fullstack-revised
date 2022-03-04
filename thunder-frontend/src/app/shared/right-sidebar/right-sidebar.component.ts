import { Component, OnInit } from '@angular/core';
import { CommonCssSwitchService } from 'src/app/services/common-css-switch.service';

@Component({
  selector: 'thunder-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(private _cssSwitchService: CommonCssSwitchService) { }

  ngOnInit(): void {
  }

  closeRightSidePopup(){
    this._cssSwitchService.rightSidePopupSwitch();

  }
}
