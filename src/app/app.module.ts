import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { PlanPage } from './pages/plan/plan.page';
import { PlansPage } from './pages/plans/plans.page';

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDTFlAGMfPtxMzp3c6jWa96ZnBijIAYG5I",
  authDomain: "parceesportsplanner.firebaseapp.com",
  databaseURL: "https://parceesportsplanner.firebaseio.com",
  projectId: "parceesportsplanner",
  storageBucket: "parceesportsplanner.appspot.com",
  messagingSenderId: "600934049396",
  appId: "1:600934049396:web:530ff61c4cd26adb185321"
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    FormBuilder,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
