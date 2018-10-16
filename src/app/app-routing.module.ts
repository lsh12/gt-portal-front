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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/guide', component: GuideComponent },
  { path: 'forum/guide/write', component: GuideWriteComponent },
  { path: 'forum/guide/detail/:id', component: GuideDetailComponent },

  { path: 'forum/qna', component: QnaComponent },
  { path: 'forum/qna/write', component: QnaWriteComponent },
  { path: 'forum/qna/detail/:id', component: QnaDetailComponent },

  { path: 'forum/document/detail/:title', component: DocumentDetailComponent },


  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, 
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }