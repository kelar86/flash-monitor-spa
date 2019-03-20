import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
    //   { path: 'home', component: DashboardComponent},
    // ]
  }
];
