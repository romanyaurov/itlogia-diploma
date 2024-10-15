import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleCommentsActionsType } from 'src/types/article-comments-actions.type';
import { CommentActionsEnum } from 'src/types/comment-actions.enum';
import { DefaultResponseType } from 'src/types/default-response.type';
import { GetCommentsResponseType } from 'src/types/get-comments-response.type';
import { TypeCheckingUtil } from '../utils/type-checking.util';

@Injectable()
export class CommentsService {

  constructor(
    private http: HttpClient,
    private typeChecker: TypeCheckingUtil
  ) { }

  public getComments(
    article: string,
    offset?: number
  ): Observable<GetCommentsResponseType> {
    return this.http.get<GetCommentsResponseType | DefaultResponseType>(
      `${environment.api}/comments?offset=${offset ? offset : 0}&article=${article}`
    ).pipe(
      map((res: GetCommentsResponseType | DefaultResponseType): GetCommentsResponseType => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          throw new Error(res.message);
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.message);
      })
    )
  }

  public getCommentsAction(
    articleId: string
  ): Observable<ArticleCommentsActionsType[]> {
    return this.http.get<ArticleCommentsActionsType[] | DefaultResponseType>(
      `${environment.api}/comments/article-comment-actions?articleId=${articleId}`
    ).pipe(
      map(res => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          throw new Error(res.message);
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'Ошибка при запросе действий пользователя.');
        }
      })
    );
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
  ): Observable<GetCommentsResponseType> {
    return this.http.post<DefaultResponseType>(
      `${environment.api}/comments`,
      { text, article }
    ).pipe(
      map((res: DefaultResponseType) => {
        if (res.error) {
          throw new Error(res.message);
        }
      }),
      switchMap((): Observable<GetCommentsResponseType> => {
        return this.getComments(article);
      }),
      catchError(() => {
        return throwError(() => 'Упс, произошла ошибка при добавлении комментария.')
      })
    )
  }
}
