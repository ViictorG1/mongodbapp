import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

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
    Ng2Bs3ModalModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    RestClientService,
    SettingsService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
