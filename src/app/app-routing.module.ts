import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './views/home/home.component';
import { AuthForwardGuard } from './core/auth/auth-forward.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Main Page (Home Page)
      { 
        path: '',
        component: HomeComponent
      },
      // Both Auth Pages (SignIn & SignUp)
      {
        path: '',
        loadChildren: () => import('./views/auth/auth.module')
          .then(m => m.AuthModule),
        canActivate: [AuthForwardGuard]
      },
      // Blog Page (Articles List)
      {
        path: '',
        loadChildren: () => import('./views/blog/blog.module')
          .then(m => m.BlogModule)
      },
      // Article Page
      {
        path: '',
        loadChildren: () => import('./views/article/article.module')
          .then(m => m.ArticleModule)
      },
      // All other pathes
      {
        path: '**',
        redirectTo: '/'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
