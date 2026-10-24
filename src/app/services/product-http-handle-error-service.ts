import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product } from '../classes/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpHandleErrorService {
  // Root-relative so requests keep working from nested routes such as /products/1.
  private readonly _url = '/datasets/products.json';

  constructor(private _http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this._http.get<Product[]>(this._url)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProductList().pipe(
      map((products: Product[]) => products.find((p) => p.id === id)),
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    const message = error.error instanceof ErrorEvent
      ? `Network error: ${error.error.message}`
      : `Request failed (${error.status}): ${error.message}`;

    return throwError(() => new Error(message));
  }
}
