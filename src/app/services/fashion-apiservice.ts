import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Fashion } from '../classes/Fashion';
import { createUniqueFashionSlug } from '../classes/fashion-slug';

@Injectable({ providedIn: 'root' })
export class FashionAPIService {
  constructor(private http: HttpClient) {}
  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>('/fashions');
  }

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`/fashions/${encodeURIComponent(id)}`);
  }

  getFashionBySlug(slug: string): Observable<Fashion | undefined> {
    return this.getFashions().pipe(
      map((fashions) => fashions.find((item) => createUniqueFashionSlug(item, fashions) === slug)),
    );
  }

  postFashion(fashion: Fashion): Observable<Fashion> {
    const payload = {
      style: fashion.style,
      fashion_subject: fashion.fashion_subject,
      fashion_detail: fashion.fashion_detail,
      fashion_image: fashion.fashion_image,
    };
    return this.http.post<Fashion>('/fashions', payload);
  }

  putFashion(fashion: Fashion): Observable<Fashion> {
    const payload = {
      _id: fashion._id,
      style: fashion.style,
      fashion_subject: fashion.fashion_subject,
      fashion_detail: fashion.fashion_detail,
      fashion_image: fashion.fashion_image,
    };
    return this.http.put<Fashion>('/fashions', payload);
  }

  deleteFashion(id: string): Observable<Fashion> {
    return this.http.delete<Fashion>(`/fashions/${encodeURIComponent(id)}`);
  }
}
