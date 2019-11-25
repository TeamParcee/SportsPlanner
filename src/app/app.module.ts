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
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperPage } from './pages/image-cropper/image-cropper.page';
import { PlanOptionsPage } from './pages/plan-options/plan-options.page';
import { TemplatePage } from './pages/template/template.page';

import { ViewProfilePage } from './pages/view-profile/view-profile.page';
import { ViewFollowersPage } from './pages/view-followers/view-followers.page';
import { SharedModule } from './modules/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';

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


library.add(far);

@NgModule({
  declarations: [
    AppComponent,
    PlansPage,
    AddPlanPage,
    EditActivityPage,
    PlanOptionsPage,
    ViewActivityPage,
    ViewDrillPage,
    ImageCropperPage,
    TemplatePage,
    EditDrillPage,
    ViewProfilePage,

  ],
  entryComponents: [
    PlansPage,
    AddPlanPage,
    EditActivityPage,
    ImageCropperPage,
    PlanOptionsPage,
    ViewActivityPage,
    ViewDrillPage,
    TemplatePage,
    EditDrillPage,
    ViewProfilePage,
    ViewFollowersPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    QuillModule.forRoot(),
    FormsModule,
    ImageCropperModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
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
export class AppModule { }
