import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ConfirmEmailGuard } from './guard/confirm-email.guard';
import { SelectCoachGuard } from './guard/select-coach.guard';
import { CoachInfoGuard } from './guard/coach-info.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard]},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule',  canActivate: [AuthGuard,ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard]},
  { path: 'coach-info', loadChildren: './pages/coach-info/coach-info.module#CoachInfoPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'drills', loadChildren: './pages/drills/drills.module#DrillsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard,  CoachInfoGuard,SelectCoachGuard]},
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'select-coach', loadChildren: './pages/select-coach/select-coach.module#SelectCoachPageModule', canActivate: [AuthGuard, CoachInfoGuard, ConfirmEmailGuard] },
  { path: 'add-drill', loadChildren: './pages/add-drill/add-drill.module#AddDrillPageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'plans', loadChildren: './pages/plans/plans.module#PlansPageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'add-plan', loadChildren: './pages/add-plan/add-plan.module#AddPlanPageModule', canActivate: [AuthGuard, ConfirmEmailGuard, CoachInfoGuard, SelectCoachGuard] },
  { path: 'edit-activity', loadChildren: './pages/edit-activity/edit-activity.module#EditActivityPageModule' },
  { path: 'view-activity', loadChildren: './pages/view-activity/view-activity.module#ViewActivityPageModule' },
  { path: 'confirm-email', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule', canActivate:[AuthGuard] },
  { path: 'view-drill', loadChildren: './pages/view-drill/view-drill.module#ViewDrillPageModule' },
  { path: 'edit-drill', loadChildren: './pages/edit-drill/edit-drill.module#EditDrillPageModule' },
  { path: 'image-cropper', loadChildren: './pages/image-cropper/image-cropper.module#ImageCropperPageModule' },
  { path: 'plan-options', loadChildren: './pages/plan-options/plan-options.module#PlanOptionsPageModule' },
  { path: 'view-templates', loadChildren: './pages/view-templates/view-templates.module#ViewTemplatesPageModule' },
  { path: 'templates', loadChildren: './pages/templates/templates.module#TemplatesPageModule' },
  { path: 'template', loadChildren: './pages/template/template.module#TemplatePageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },  { path: 'search-drills', loadChildren: './pages/search-drills/search-drills.module#SearchDrillsPageModule' },
  { path: 'view-followers', loadChildren: './pages/view-followers/view-followers.module#ViewFollowersPageModule' },
  { path: 'view-profile', loadChildren: './pages/view-profile/view-profile.module#ViewProfilePageModule' },
  { path: 'message-list', loadChildren: './pages/message-list/message-list.module#MessageListPageModule' },
  { path: 'select-contact', loadChildren: './pages/select-contact/select-contact.module#SelectContactPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
