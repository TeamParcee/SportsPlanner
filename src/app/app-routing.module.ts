import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ConfirmEmailGuard } from './guard/confirm-email.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full', canActivate: [AuthGuard, ConfirmEmailGuard]},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule',  canActivate: [AuthGuard,ConfirmEmailGuard]},
  { path: 'coach-info', loadChildren: './pages/coach-info/coach-info.module#CoachInfoPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'drills', loadChildren: './pages/drills/drills.module#DrillsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard]},
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'select-coach', loadChildren: './pages/select-coach/select-coach.module#SelectCoachPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'add-drill', loadChildren: './pages/add-drill/add-drill.module#AddDrillPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'plans', loadChildren: './pages/plans/plans.module#PlansPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'add-plan', loadChildren: './pages/add-plan/add-plan.module#AddPlanPageModule', canActivate: [AuthGuard, ConfirmEmailGuard] },
  { path: 'edit-activity', loadChildren: './pages/edit-activity/edit-activity.module#EditActivityPageModule' },
  { path: 'view-activity', loadChildren: './pages/view-activity/view-activity.module#ViewActivityPageModule' },
  { path: 'confirm-email', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule', canActivate:[AuthGuard] },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
