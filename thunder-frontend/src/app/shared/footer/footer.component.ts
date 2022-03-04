import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thunder-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isNavbarOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
