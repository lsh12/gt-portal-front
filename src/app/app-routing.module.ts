import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GuideComponent } from './pages/forum/guide/guide.component';
import { ForumComponent } from './pages/forum/forum.component';
import { GuideDetailComponent } from './pages/forum/guide/guide-detail/guide-detail.component';
import { GuideWriteComponent } from './pages/forum/guide/guide-write/guide-wirte.component';
import { QnaComponent } from './pages/forum/qna/qna.component';
import { QnaWriteComponent } from './pages/forum/qna/qna-write/qna-write.component';
import { QnaDetailComponent } from './pages/forum/qna/qna-detail/qna-detail.component';
import { DocumentDetailComponent } from './pages/forum/document/document-detail/document-detail.component';
import { DocumentComponent } from './pages/forum/document/document.component';
import { QnaEditComponent } from './pages/forum/qna/qna-edit/qna-edit.component';
import { GuideEditComponent } from './pages/forum/guide/guide-edit/guide-edit.component';
import { ImageComponent } from './pages/forum/image/image.component';

const routes: Routes = [
  { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
  { path: 'monitor', loadChildren: './pages/monitor/monitor.module#MonitorModule' },
  
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/guide', component: GuideComponent },
  { path: 'forum/guide/write', component: GuideWriteComponent },
  { path: 'forum/guide/detail/:id', component: GuideDetailComponent },
  { path: 'forum/guide/edit/:id', component: GuideEditComponent },

  { path: 'forum/qna', component: QnaComponent },
  { path: 'forum/qna/write', component: QnaWriteComponent },
  { path: 'forum/qna/detail/:id', component: QnaDetailComponent },
  { path: 'forum/qna/edit/:id', component: QnaEditComponent },

  { path: 'forum/document', component: DocumentComponent },
  { path: 'forum/document/detail/:subTitle', component: DocumentDetailComponent },

  { path: 'forum/image', component: ImageComponent },
 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
