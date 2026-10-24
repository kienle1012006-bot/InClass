import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/IProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-list-search-component',
  standalone: false,
  templateUrl: './product-list-search-component.html',
  styleUrl: './product-list-search-component.css',
})
export class ProductListSearchComponent implements OnInit {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  minPrice = signal(0);
  maxPrice = signal(0);
  errMessage = signal('');

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
        this.applyFilter();
      },
      error: (err: Error) => {
        this.errMessage.set(err.message);
      },
    });

    this.activateRoute.queryParamMap.subscribe((param) => {
      const min = param.get('min');
      const max = param.get('max');

      this.minPrice.set(min != null ? Number(min) : 0);
      this.maxPrice.set(max != null ? Number(max) : 0);
      this.applyFilter();
    });
  }

  onFilter(): void {
    this.router.navigate(['/searchproduct'], {
      queryParams: {
        min: this.minPrice(),
        max: this.maxPrice(),
      },
    });
  }

  onFilterWithoutQueryParams(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    const min = this.minPrice();
    const max = this.maxPrice() > 0 ? this.maxPrice() : Number.MAX_SAFE_INTEGER;
    const result = this.products().filter((p) => p.price >= min && p.price <= max);

    this.filteredProducts.set(result);
  }
}
