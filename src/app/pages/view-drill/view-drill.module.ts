import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewDrillPage } from './view-drill.page';
import { DrillsPageModule } from '../drills/drills.module';

const routes: Routes = [
  {
    path: '',
    component: ViewDrillPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewDrillPage]
})
export class ViewDrillPageModule {}
