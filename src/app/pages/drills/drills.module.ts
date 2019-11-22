import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrillsPage } from './drills.page';
import { HideHeaderDirective } from 'src/app/directives/hide-header.directive';
import { PublicDrillsComponent } from './public-drills/public-drills.component';
import { PrivateDrillsComponent } from './private-drills/private-drills.component';

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
  declarations: [DrillsPage, HideHeaderDirective, PublicDrillsComponent, PrivateDrillsComponent]
})
export class DrillsPageModule {}
