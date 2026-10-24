import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

type SearchField = 'fashion_subject' | 'fashion_detail';
type SearchResult = Fashion & { similarity: number };

@Component({
  selector: 'app-search-fashion-component',
  standalone: false,
  templateUrl: './search-fashion-component.html',
  styleUrl: './search-fashion-component.css',
})
export class SearchFashionComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  results = signal<SearchResult[]>([]);
  query = '';
  searchField: SearchField = 'fashion_subject';
  resultLimit = 10;
  hasSearched = signal(false);
  isLoading = signal(true);
  errMessage = signal('');

  constructor(
    private readonly fashionService: FashionAPIService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fashionService.getFashions().subscribe({
      next: (items) => {
        this.fashions.set(items.map((item) => Object.assign(new Fashion(), item)));
        this.isLoading.set(false);
        const params = this.route.snapshot.queryParamMap;
        const query = params.get('q');
        const field = params.get('field');
        const limit = Number(params.get('limit'));
        if (field === 'fashion_subject' || field === 'fashion_detail') {
          this.searchField = field;
        }
        if ([5, 10, 20, 50, 100].includes(limit)) this.resultLimit = limit;
        if (query) {
          this.query = query;
          this.search();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errMessage.set(error.error?.message ?? error.message);
        this.isLoading.set(false);
      },
    });
  }

  search(): void {
    const queryTokens = this.tokenize(this.query);
    this.hasSearched.set(true);
    this.errMessage.set('');

    if (!queryTokens.size) {
      this.results.set([]);
      this.errMessage.set('Nhập từ hoặc cụm từ cần tìm trước khi tìm kiếm.');
      return;
    }

    const matches = this.fashions()
      .map((fashion) =>
        Object.assign(new Fashion(), fashion, {
          similarity: this.jaccard(
            queryTokens,
            this.tokenize(fashion[this.searchField] ?? ''),
          ),
        }),
      )
      .filter((fashion) => fashion.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity || (a._id ?? '').localeCompare(b._id ?? ''));

    this.results.set(matches.slice(0, this.resultLimit));
  }

  rowClass(similarity: number): string {
    if (similarity >= 0.75) return 'similarity-high';
    if (similarity >= 0.5) return 'similarity-medium';
    return 'similarity-low';
  }

  private jaccard(queryTokens: Set<string>, fashionTokens: Set<string>): number {
    if (!queryTokens.size || !fashionTokens.size) return 0;
    let intersection = 0;
    queryTokens.forEach((token) => {
      if (fashionTokens.has(token)) intersection += 1;
    });
    const union = queryTokens.size + fashionTokens.size - intersection;
    return union ? intersection / union : 0;
  }

  private tokenize(value: string): Set<string> {
    const normalized = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('vi')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
    return new Set(normalized ? normalized.split(/\s+/) : []);
  }
}
