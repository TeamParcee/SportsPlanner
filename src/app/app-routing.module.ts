import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule' },
  { path: 'coach-info', loadChildren: './pages/coach-info/coach-info.module#CoachInfoPageModule' },
  { path: 'drills', loadChildren: './pages/drills/drills.module#DrillsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'select-coach', loadChildren: './pages/select-coach/select-coach.module#SelectCoachPageModule' },
  { path: 'add-drill', loadChildren: './pages/add-drill/add-drill.module#AddDrillPageModule' },
  { path: 'plans', loadChildren: './pages/plans/plans.module#PlansPageModule' },
  { path: 'add-plan', loadChildren: './pages/add-plan/add-plan.module#AddPlanPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
