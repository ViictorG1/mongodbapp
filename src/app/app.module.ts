import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RestClientService } from './core/services/rest-client.service';
import { SettingsService } from './core/services/settings.service';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    RestClientService,
    SettingsService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
