import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent {
  // Array of Product objects
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrqEn43bTEDewZRKWM0XdA-rMatcHoy07dDY9ID0dN6Q&s=10' },
    { id: 2, name: 'Smartphone', price: 699, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMubDdUU_rkm71MmtsL3B0dJ4QHq0siowjmOrYJHYX1w&s=10' },
    { id: 3, name: 'Tablet', price: 399, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWq9WwjNINi4GXa0cSu-AxsanWDbziS0FnRipSJ-luaA&s=10' }
  ];

  // Performance optimization function for ngFor
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
