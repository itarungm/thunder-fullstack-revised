import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Spinkit, SpinnerVisibilityService } from 'ng-http-loader';
import { CryptoService } from 'src/app/services/crypto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'thunder-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  @Input() fileType: string;
  @Input() fileLink: string;
  frameLoaded: boolean = false;

  constructor(private spinner: SpinnerVisibilityService) {

  }


  ngOnInit(): void {
    if (!this.fileType.includes('image')) {
      this.spinner.show();
    }
  }

  onFrameLoad() {
    this.frameLoaded = true;
    this.spinner.hide();

  }

}
