import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'thunder-root',
  templateUrl: './thunder-root.component.html',
  styleUrls: ['./thunder-root.component.scss']
})
export class ThunderRootComponent {
  public spinkit = Spinkit;
  title = 'thunder';
}
