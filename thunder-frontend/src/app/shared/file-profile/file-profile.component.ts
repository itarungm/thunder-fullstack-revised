import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thunder-file-profile',
  templateUrl: './file-profile.component.html',
  styleUrls: ['./file-profile.component.scss']
})
export class FileProfileComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
    
  }

}
