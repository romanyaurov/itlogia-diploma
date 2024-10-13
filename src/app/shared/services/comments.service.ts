import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ArticleCommentsActionsType } from 'src/types/article-comments-actions.type';
import { CommentActionsEnum } from 'src/types/comment-actions.enum';
import { CommentType } from 'src/types/comment.type';
import { DefaultResponseType } from 'src/types/default-response.type';
import { GetCommentsResponseType } from 'src/types/get-comments-response.type';
import { TypeCheckingService } from './type-checking.service';

@Injectable()
export class CommentsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private typeChecker: TypeCheckingService
  ) { }

  public getComments(
    article: string,
    offset?: number
  ): Observable<GetCommentsResponseType | DefaultResponseType> {
    return this.http.get<GetCommentsResponseType | DefaultResponseType>(
      `${environment.api}/comments?offset=${offset ? offset : 0}&article=${article}`
    ).pipe(
      tap((res: GetCommentsResponseType | DefaultResponseType) => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          res.error ? throwError(() => res.message) : null;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        throw err.error.message;
      })
    )
  }

  public getCommentsAction(
    articleId: string
  ): Observable<ArticleCommentsActionsType[] | DefaultResponseType> {
    return this.http.get<ArticleCommentsActionsType[] | DefaultResponseType>(
      `${environment.api}/comments/article-comment-actions?articleId=${articleId}`
    ).pipe(
      tap(res => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          if (res.error)
          throwError(() => res.message)
        }
      }),
      catchError((err: HttpErrorResponse) => {
        throw 'Ошибка при запросе действий пользователя.'
      })
    )
  }

  public postCommentAction(
    commentId: string,
    action: CommentActionsEnum
  ): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      `${environment.api}/comments/${commentId}/apply-action`,
      { action }
    ).pipe(
      map((res: DefaultResponseType) => {
        if (res.error) {
          throw new Error(res.message);
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'Неизвестная ошибка при применении действия.');
        }
      })
    );
  }

  public postComment(
    text: string,
    article: string
  ): Observable<GetCommentsResponseType | DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      `${environment.api}/comments`,
      { text, article }
    ).pipe(
      tap((res: DefaultResponseType) => {
        if (res.error) {
          throwError(() => res.message)
        }
      }),
      switchMap((): Observable<GetCommentsResponseType | DefaultResponseType> => {
        return this.getComments(article);
      }),
      catchError((err: HttpErrorResponse) => {
        throw 'Упс, произошла ошибка при добавлении комментария.'
      })
    )
  }

  public isGetCommentsResponseType(obj: any): obj is GetCommentsResponseType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.allCount === 'number' &&
      typeof obj.comments === 'object'
    )
  }
}
