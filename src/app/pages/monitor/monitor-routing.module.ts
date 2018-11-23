import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApisComponent } from './apis/apis.component';
import { AppsComponent } from './apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonitorComponent } from './monitor.component';


const routes: Routes = [{
  path: '',
  component: MonitorComponent,
  children: [
    {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'apis',
    component: ApisComponent,
  },
  {
    path: 'apps',
    component: AppsComponent,
  },
  
  
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: DashboardComponent,
  }],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorRoutingModule { }
