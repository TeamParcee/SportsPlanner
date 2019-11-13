import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanPage } from './pages/plan/plan.page';
import { PlansPage } from './pages/plans/plans.page';
import { AddPlanPage } from './pages/add-plan/add-plan.page';
import { EditActivityPage } from './pages/edit-activity/edit-activity.page';
import { ViewActivityPage } from './pages/view-activity/view-activity.page';
import { QuillModule } from 'ngx-quill'
import { ViewDrillPage } from './pages/view-drill/view-drill.page';
import { EditDrillPage } from './pages/edit-drill/edit-drill.page';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
  declarations: [
    AppComponent,
    PlansPage,
    AddPlanPage,
    EditActivityPage,
    ViewActivityPage,
    ViewDrillPage,
    EditDrillPage,
  ],
  entryComponents: [
    PlansPage,
    AddPlanPage,
    EditActivityPage,
    ViewActivityPage,
    ViewDrillPage,
    EditDrillPage,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule],
  providers: [
    FormBuilder,
    StatusBar,
    NativeAudio,
    Vibration,
    SplashScreen,
    BackgroundMode,
    LocalNotifications,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
