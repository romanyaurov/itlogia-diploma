import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { ArticleCardComponent } from 'src/app/shared/components/article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { ServerImagePathPipe } from 'src/app/shared/pipes/server-image-path.pipe';
import { SvgIconComponent } from 'src/app/shared/components/common/svg-icon/svg-icon.component';
import { FormsModule } from '@angular/forms';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { CommentCardComponent } from 'src/app/shared/components/comment-card/comment-card.component';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleCardComponent,
    RouterModule,
    SvgIconComponent,
    FormsModule,
    ServerImagePathPipe,
    CommentCardComponent,
    ArticleRoutingModule
  ],
  providers: [
    CommentsService
  ],
  exports: [
    ArticleComponent
  ]
})
export class ArticleModule { }
