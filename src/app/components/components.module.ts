import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { IntroComponent } from './intro/intro.component';
import { SharedModule } from '../common/shared.module';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
    ComponentsComponent,
    IntroComponent,
    HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    
  ],
})
export class ComponentsModule {
}
