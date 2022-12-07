import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../modules/article';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  private _url: string = 'https://localhost:7187'; // default port for .Net service

  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }

  getAllArticles(): Observable<Article[]> {
    return this.http
      .get<Article[]>(this._url + '/api/Articles/GetAllArticle')
      .pipe(catchError(this.errorHandler));
  }

  getPublishedArticles(): Observable<Article[]> {
    return this.http
      .get<Article[]>(this._url + '/api/Articles/GetPublishedArticle')
      .pipe(catchError(this.errorHandler));
  }

  getArticleById(id: string): Observable<Article> {
    return this.http
      .get<Article>(this._url + '/api/Articles/GetArticle/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addArticle(article: Article): Observable<Article> {
    article.id = 0;
    return this.http
      .post<Article>(this._url + '/api/Articles/CreateArticle', article)
      .pipe(catchError(this.errorHandler));
  }

  deleteArticleById(id: string): Observable<Article> {
    return this.http
      .delete<Article>(this._url + '/api/Articles/DeleteArticle/' + id)
      .pipe(catchError(this.errorHandler));
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    return this.http
      .put<Article>(this._url + '/api/Articles/UpdateArticle/' + id, article)
      .pipe(catchError(this.errorHandler));
  }
}
