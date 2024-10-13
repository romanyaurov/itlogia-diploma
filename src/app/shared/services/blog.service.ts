import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleCategoryType } from 'src/types/article-category.type';
import { ArticlesType } from 'src/types/articles.type';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(
    page?: number | undefined,
    categories?: string[] | undefined
  ): Observable<ArticlesType> {
    let queryParams;
    if (page && page > 1) {
      queryParams = '?page=' + page
    }
    if (categories && categories.length > 0) {
      if (queryParams) {
        queryParams = queryParams + '&categories='
      } else {
        queryParams = '?categories='
      }
      if (typeof categories === 'string') {
        queryParams = queryParams + categories;
      } else {
        queryParams = queryParams + categories.join('&categories=');
      }
    }
    return this.http.get<ArticlesType>(
      `${environment.api}/articles${queryParams ? queryParams : ''}`
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw 'Упс, ошибка при запросе статей.'
      })
    );
  }

  getCategories(): Observable<ArticleCategoryType[]> {
    return this.http.get<ArticleCategoryType[]>(
      `${environment.api}/categories`
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw 'Упс, ошибка при запросе категорий.'
      })
    )
  }
}
