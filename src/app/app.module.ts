import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ForumComponent } from './pages/forum/forum.component';
import { GuideComponent } from './pages/forum/guide/guide.component';

import { GuideDetailComponent } from './pages/forum/guide/guide-detail/guide-detail.component';
import { GuideWriteComponent } from './pages/forum/guide/guide-write/guide-wirte.component';
import { APP_BASE_HREF } from '@angular/common';
import { QnaComponent } from './pages/forum/qna/qna.component';
import { QnaDetailComponent } from './pages/forum/qna/qna-detail/qna-detail.component';
import { QnaWriteComponent } from './pages/forum/qna/qna-write/qna-write.component';
import { DocumentComponent } from './pages/forum/document/document.component';
import { DocumentDetailComponent } from './pages/forum/document/document-detail/document-detail.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { QnaEditComponent } from './pages/forum/qna/qna-edit/qna-edit.component';
import { GuideEditComponent } from './pages/forum/guide/guide-edit/guide-edit.component';
import { ImageComponent } from './pages/forum/image/image.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForumComponent,
    GuideComponent,
    GuideWriteComponent,
    GuideDetailComponent,
    QnaComponent,
    QnaDetailComponent,
    QnaWriteComponent,
    DocumentComponent,
    DocumentDetailComponent,
    HeaderComponent,
    FooterComponent,
    QnaEditComponent,
    GuideEditComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularMultiSelectModule,
    NgxPaginationModule
  ],
  providers: [ {provide: APP_BASE_HREF, useValue: '/gtportal'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
