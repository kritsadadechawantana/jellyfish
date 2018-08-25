import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AddPage } from '../pages/add/add';
import { BorrowqrPage } from '../pages/borrowqr/borrowqr';
import { PairconfirmPage } from '../pages/pairconfirm/pairconfirm';
import { ReturnPage } from '../pages/return/return';
import { ReturnqrPage} from '../pages/returnqr/returnqr';
import { ManagePage } from '../pages/manage/manage';
import { DetailPage } from '../pages/detail/detail';
import { EditPage } from '../pages/edit/edit';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SharedserviceProvider } from '../providers/sharedservice/sharedservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AddPage,
    BorrowqrPage,
    PairconfirmPage,
    ReturnPage,
    ReturnqrPage,
    ManagePage,
    DetailPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AddPage,
    BorrowqrPage,
    PairconfirmPage,
    ReturnPage,
    ReturnqrPage,
    ManagePage,
    DetailPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedserviceProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
