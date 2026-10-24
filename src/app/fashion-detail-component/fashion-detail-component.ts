import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { createUniqueFashionSlug } from '../classes/fashion-slug';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent implements OnInit {
  fashion = signal<Fashion | null>(null);
  errMessage = signal('');
  slug = signal('');

  constructor(
    private readonly fashionService: FashionAPIService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      const legacyId = params.get('id');
      if (slug) this.loadBySlug(slug);
      else if (legacyId) this.loadLegacyId(legacyId);
      else this.showNotFound();
    });
  }

  private loadBySlug(slug: string): void {
    this.slug.set(slug);
    this.fashion.set(null);
    this.errMessage.set('');
    this.fashionService.getFashionBySlug(slug).subscribe({
      next: (item) => item ? this.fashion.set(Object.assign(new Fashion(), item)) : this.showNotFound(),
      error: () => this.showNotFound(),
    });
  }

  private loadLegacyId(id: string): void {
    this.fashion.set(null);
    this.errMessage.set('');
    this.fashionService.getFashion(id).subscribe({
      next: (item) => {
        const fashion = Object.assign(new Fashion(), item);
        this.fashion.set(fashion);
        this.fashionService.getFashions().subscribe({
          next: (fashions) => this.slug.set(createUniqueFashionSlug(fashion, fashions)),
          error: () => this.slug.set(String(fashion.IdF)),
        });
      },
      error: () => this.showNotFound(),
    });
  }

  private showNotFound(): void {
    this.fashion.set(null);
    this.errMessage.set('Không tìm thấy sản phẩm');
  }
}
