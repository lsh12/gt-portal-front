import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [{
  path: '',
  component: ComponentsComponent,
  children: [{
    path: 'intro',
    component: IntroComponent,
  }, {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  }, {
    path: '**',
    component: IntroComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {
}
