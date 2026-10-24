import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFakeProduct } from '../classes/IFakeProduct';

@Injectable({
  providedIn: 'root',
})
export class FakeProductService {
  private readonly url = 'https://fakestoreapi.com/products';

  constructor(private readonly http: HttpClient) {}

  getFakeProductData(): Observable<IFakeProduct[]> {
    return this.http.get<IFakeProduct[]>(this.url);
  }
}
