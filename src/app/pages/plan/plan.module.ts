import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlanPage } from './plan.page';
import { CalendarModule } from 'ion2-calendar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from 'src/app/modules/shared/shared.module';

library.add(far, fas);

const routes: Routes = [
  {
    path: '',
    component: PlanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlanPage]
})
export class PlanPageModule {}
