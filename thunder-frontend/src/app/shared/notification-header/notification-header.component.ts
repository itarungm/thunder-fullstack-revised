import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thunder-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.scss']
})
export class NotificationHeaderComponent implements OnInit {
  @Input() uploadCount: number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
