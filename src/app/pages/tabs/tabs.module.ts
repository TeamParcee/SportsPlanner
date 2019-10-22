import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'plan',
        loadChildren: '../plan/plan.module#PlanPageModule' 
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule' 
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule' 
      },
      {
        path: 'drills',
        loadChildren: '../drills/drills.module#DrillsPageModule' 
      },
      {
        path: '',
        redirectTo: 'plan'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
