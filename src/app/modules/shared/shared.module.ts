import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileDirective } from 'src/app/directives/view-profile.directive';
import { ViewFollowersPage } from 'src/app/pages/view-followers/view-followers.page';
import { IonicModule } from '@ionic/angular';
import { SwipeDownCloseComponent } from './swipe-down-close/swipe-down-close.component';
import { DrillsLoadingComponent } from 'src/app/loading-screens/drills-loading/drills-loading.component';
import { PlanLoadingComponent } from 'src/app/loading-screens/plan-loading/plan-loading.component';



@NgModule({
  declarations: [
    ViewProfileDirective, 
    ViewFollowersPage, 
    PlanLoadingComponent,
    SwipeDownCloseComponent, 
    DrillsLoadingComponent,],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ViewProfileDirective, 
    ViewFollowersPage, 
    PlanLoadingComponent,
    SwipeDownCloseComponent, 
    DrillsLoadingComponent]
})
export class SharedModule { }
