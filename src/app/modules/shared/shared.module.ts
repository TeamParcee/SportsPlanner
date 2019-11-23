import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileDirective } from 'src/app/directives/view-profile.directive';
import { ViewFollowersPage } from 'src/app/pages/view-followers/view-followers.page';
import { IonicModule } from '@ionic/angular';
import { SwipeDownCloseComponent } from './swipe-down-close/swipe-down-close.component';



@NgModule({
  declarations: [ViewProfileDirective, ViewFollowersPage, SwipeDownCloseComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ViewProfileDirective, ViewFollowersPage, SwipeDownCloseComponent]
})
export class SharedModule { }
