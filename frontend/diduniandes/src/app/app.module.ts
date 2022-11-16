import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { WalletComponent } from './wallet/wallet.component';
import { UserComponent } from './user/user.component';
import { ServiceComponent } from './service/service.component';
import { DoneComponent } from './done/done.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    WalletComponent,
    UserComponent,
    ServiceComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
