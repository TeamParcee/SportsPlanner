import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SportsPlannerTemplatesPage } from './sports-planner-templates.page';

const routes: Routes = [
  {
    path: '',
    component: SportsPlannerTemplatesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SportsPlannerTemplatesPage]
})
export class SportsPlannerTemplatesPageModule {}
