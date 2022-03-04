import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ThunderRootModule } from './app/thunder-root.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  window.console.log = () => { }
}

platformBrowserDynamic().bootstrapModule(ThunderRootModule)
  .catch(err => console.error(err));
