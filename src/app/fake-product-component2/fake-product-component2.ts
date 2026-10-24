import { Component, signal } from '@angular/core';
import { IFakeProduct } from '../classes/IFakeProduct';
import { FakeProductService } from '../services/fake-product-service';

@Component({
  selector: 'app-fake-product-component2',
  standalone: false,
  templateUrl: './fake-product-component2.html',
  styleUrl: './fake-product-component2.css',
})
export class FakeProductComponent2 {
  products=signal<IFakeProduct[]>([])
  errMessage=signal('')
  constructor(private _service:FakeProductService){
  }
  ngOnInit():void
  {
    this._service.getFakeProductData().subscribe({
      next:(data)=>{ this.products.set(data)},
      error:(err)=>{
        this.errMessage.set(err instanceof Error ? err.message : String(err))
      }
    })
  }
}


