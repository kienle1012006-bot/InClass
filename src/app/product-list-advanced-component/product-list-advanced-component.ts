import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/IProduct';
import { createSlug } from '../classes/slug-helper';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  templateUrl: './product-list-advanced-component.html',
  styleUrl: './product-list-advanced-component.css',
})
export class ProductListAdvancedComponent implements OnInit {
  products = signal<Product[]>([]);
  errMessage = signal('');
  generateSlug = createSlug;

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err: Error) => {
        this.errMessage.set(err.message);
      },
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  viewDetailSlug(p: Product): void {
    const slug = this.generateSlug(p.name, p.id);
    this.router.navigate(['/products', slug]);
  }
}
