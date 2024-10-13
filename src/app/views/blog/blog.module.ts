import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { StaticImagePathPipe } from 'src/app/shared/pipes/static-image-path.pipe';
import { ServerImagePathPipe } from 'src/app/shared/pipes/server-image-path.pipe';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ArticleCardComponent } from 'src/app/shared/components/article-card/article-card.component';
import { SvgIconComponent } from 'src/app/shared/components/common/svg-icon/svg-icon.component';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StaticImagePathPipe,
    ServerImagePathPipe,
    ArticleCardComponent,
    SvgIconComponent,
    BlogRoutingModule
  ],
  providers: [
    BlogService
  ],
  exports: [
    BlogComponent
  ]
})
export class BlogModule { }
