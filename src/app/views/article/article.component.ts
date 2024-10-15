import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { ArticleCommentsActionsType } from 'src/types/article-comments-actions.type';
import { ArticleType } from 'src/types/article.type';
import { CommentActionsEnum } from 'src/types/comment-actions.enum';
import { DetailedArticleType } from 'src/types/detailed-article.type';
import { GetCommentsResponseType } from 'src/types/get-comments-response.type';

@Component({
  selector: 'app-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  private articleUrl!: string;
  protected article!: DetailedArticleType & { related: ArticleType[] };

  protected commentInputValue: string = '';

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private snackBar: MatSnackBar,
    protected authService: AuthService,
    private commentsService: CommentsService,
  ) { }

  ngOnInit(): void {
    this.articleUrl = this.route.snapshot.paramMap.get('articleUrl') || '';
    if (this.articleUrl) {
      this.articlesService.getArticle(this.articleUrl)
        .subscribe({
          next: ((article: DetailedArticleType & { related: ArticleType[] }) => {
            this.article = article;
            if (this.authService.isAuth) {
              this.commentsService.getCommentsAction(this.article.id)
                .subscribe({
                  next: (res: ArticleCommentsActionsType[]) => {
                    res.forEach((comment: ArticleCommentsActionsType) => {
                      const foundComment = this.article.comments
                        .find(item => item.id === comment.comment);
                      if (foundComment) {
                        foundComment.action = comment.action;
                      }
                    })
                  },
                  error: (err: string) => { this.snackBar.open(err); }
                })
            }
          }),
          error: (err: string) => { this.snackBar.open(err); }
        });
    }
  }

  protected postComment() {
    if (this.commentInputValue) {
      this.commentsService.postComment(
        this.commentInputValue,
        this.article.id
      ).subscribe({
        next: (res: GetCommentsResponseType) => {
          this.article.comments = res.comments.slice(0, 3);
          this.article.commentsCount = res.allCount;
          this.commentInputValue = '';
        },
        error: (err: string) => {
          this.snackBar.open(err);
        }
      })
    }
  }

  protected loadAllComments() {
    this.commentsService.getComments(
      this.article.id,
      this.article.comments.length
    ).subscribe({
      next: (res: GetCommentsResponseType) => {
        this.article.comments.push(...res.comments);
      }
    })
  }

  protected postCommentAction(
    actionData: {
      commentId: string,
      action: CommentActionsEnum
    }
  ): void {
    this.commentsService.postCommentAction(
      actionData.commentId,
      actionData.action
    ).subscribe({
      next: () => {
        if (actionData.action === CommentActionsEnum.violate) {
          this.snackBar.open(
            'Ваша жалоба будет рассмотренна модераторами.'
          )
        } else {
          this.applyActionIntoComment(
            actionData.commentId,
            actionData.action
          );
        }
      },
      error: (err: string) => {
        this.snackBar.open(err);
      }
    })
  }

  private applyActionIntoComment(
    commentId: string,
    action: CommentActionsEnum
  ): void {
    const currentComment = this.article.comments
      .find(comment => comment.id === commentId);
    if (currentComment) {
      
      if (!currentComment.action) {
        switch (action) {
          case CommentActionsEnum.like:
            currentComment.action = CommentActionsEnum.like;
            currentComment.likesCount++;
            break;
          case CommentActionsEnum.dislike:
            currentComment.action = CommentActionsEnum.dislike;
            currentComment.dislikesCount++;
            break;
        }
      } else if (currentComment.action === CommentActionsEnum.like) {
        switch (action) {
          case CommentActionsEnum.like:
            delete currentComment.action;
            currentComment.likesCount--;
            break;
          case CommentActionsEnum.dislike:
            currentComment.action = CommentActionsEnum.dislike;
            currentComment.likesCount--;
            currentComment.dislikesCount++;
            break;
        }
      } else if (currentComment.action === CommentActionsEnum.dislike) {
        switch (action) {
          case CommentActionsEnum.like:
            currentComment.action = CommentActionsEnum.like;
            currentComment.dislikesCount--;
            currentComment.likesCount++;
            break;
          case CommentActionsEnum.dislike:
            delete currentComment.action;
            currentComment.dislikesCount--;
            break;
        }
      }
    }
  }

}
