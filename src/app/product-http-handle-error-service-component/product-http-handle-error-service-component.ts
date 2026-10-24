import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/IProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-http-handle-error-service-component',
  standalone: false,
  templateUrl: './product-http-handle-error-service-component.html',
  styleUrl: './product-http-handle-error-service-component.css',
})
export class ProductHttpHandleErrorServiceComponent implements OnInit {
  products = signal<Product[]>([]);
  errMessage = signal('');

  constructor(
    private productHttpHandleErrorService: ProductHttpHandleErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productHttpHandleErrorService.getProductList().subscribe({
      next: (products) => this.products.set(products),
      error: (error: Error) => this.errMessage.set(error.message),
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
