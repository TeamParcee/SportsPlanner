import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule',  canActivate: [AuthGuard]},
  { path: 'coach-info', loadChildren: './pages/coach-info/coach-info.module#CoachInfoPageModule', canActivate: [AuthGuard] },
  { path: 'drills', loadChildren: './pages/drills/drills.module#DrillsPageModule', canActivate: [AuthGuard]},
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'select-coach', loadChildren: './pages/select-coach/select-coach.module#SelectCoachPageModule', canActivate: [AuthGuard] },
  { path: 'add-drill', loadChildren: './pages/add-drill/add-drill.module#AddDrillPageModule', canActivate: [AuthGuard] },
  { path: 'plans', loadChildren: './pages/plans/plans.module#PlansPageModule', canActivate: [AuthGuard] },
  { path: 'add-plan', loadChildren: './pages/add-plan/add-plan.module#AddPlanPageModule', canActivate: [AuthGuard] },
  { path: 'edit-activity', loadChildren: './pages/edit-activity/edit-activity.module#EditActivityPageModule' },  { path: 'view-activity', loadChildren: './pages/view-activity/view-activity.module#ViewActivityPageModule' },
  { path: 'confirm-email', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
