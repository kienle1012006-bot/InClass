import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  templateUrl: './product-list-call-service-component.html',
  styleUrl: './product-list-call-service-component.css',
})
export class ProductListCallServiceComponent {
  products: Product[];
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  filterProducts(): void {
    const allProducts = this.productService.getProducts();

    this.products = allProducts.filter((product) => {
      const matchesMin = this.minPrice === null || product.price >= this.minPrice;
      const matchesMax = this.maxPrice === null || product.price <= this.maxPrice;

      return matchesMin && matchesMax;
    });
  }
}
