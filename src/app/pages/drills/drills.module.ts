import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrillsPage } from './drills.page';
import { HideHeaderDirective } from 'src/app/directives/hide-header.directive';

const routes: Routes = [
  {
    path: '',
    component: DrillsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DrillsPage, HideHeaderDirective]
})
export class DrillsPageModule {}
