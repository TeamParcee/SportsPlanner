import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewAdminTemplatePage } from './new-admin-template.page';

const routes: Routes = [
  {
    path: '',
    component: NewAdminTemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewAdminTemplatePage]
})
export class NewAdminTemplatePageModule {}
