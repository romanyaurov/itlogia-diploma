import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleType } from 'src/types/article.type';
import { DetailedArticleType } from 'src/types/detailed-article.type';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient
  ) { }

  public getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(`${environment.api}/articles/top`)
      .pipe(
        catchError(() => {
            return throwError(() => 'Ошибка запроса популярных статей.');
          }
        )
      )
  }

  public getArticle(url: string): Observable<DetailedArticleType & { related: ArticleType[] }> {
    return this.http.get<DetailedArticleType>(
      `${environment.api}/articles/${url}`
    ).pipe(
      switchMap((articleDetails: DetailedArticleType) => {
        return this.http.get<ArticleType[]>(
          `${environment.api}/articles/related/${url}`
        ).pipe(
          map((relatedArticles: ArticleType[]) => ({
            ...articleDetails,
            related: relatedArticles
          }))
        )
      }),
      catchError(() => {
          return throwError(() => 'Ошибка при запросе статьи.');
        }
      )
    )
  }
}
