import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { ApisComponent } from './apis/apis.component';
import { AppsComponent } from './apps/apps.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [MonitorComponent, ApisComponent, AppsComponent, SidebarComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonitorRoutingModule,
    ChartsModule
  ]
})
export class MonitorModule { }
