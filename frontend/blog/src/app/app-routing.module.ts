import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { AddArticleComponent } from './components/add-article/add-article.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
  },
  {
    path: 'add-article',
    component: AddArticleComponent,
  },
  {
    path: 'edit-article',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
