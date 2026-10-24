import { Component, signal } from '@angular/core';
import { FashionAPIService } from '../services/fashion-apiservice';
import { Fashion } from '../classes/Fashion';
import { createUniqueFashionSlug } from '../classes/fashion-slug';

@Component({
  selector: 'app-fashion-component',
  standalone: false,
  templateUrl: './fashion-component.html',
  styleUrl: './fashion-component.css',
})
export class FashionComponent {
  fashions=signal<Fashion[]>([]);
  errMessage=signal('')
  slugFor(fashion: Fashion): string {
    return createUniqueFashionSlug(fashion, this.fashions());
  }
  constructor(public _service: FashionAPIService){
    this._service.getFashions().subscribe({
      next:(data)=>{this.fashions.set(data.map((item) => Object.assign(new Fashion(), item)))},
      error:(err: Error)=>{this.errMessage.set(err.message)}
    })
  }
}


