import { platformBrowser } from '@angular/platform-browser';
import { VERSION, enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

const ngVersion = VERSION.full;
(window as any).plattform = (window as any).plattform || {};
let platform = (window as any).plattform[ngVersion];
if (!platform) {
  platform = platformBrowser();
  (window as any).plattform[ngVersion] = platform;
}
platform.bootstrapModule(AppModule).catch((err: any) => console.error(err));
