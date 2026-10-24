import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component';

describe('ProductHttpHandleErrorServiceComponent', () => {
  let component: ProductHttpHandleErrorServiceComponent;
  let fixture: ComponentFixture<ProductHttpHandleErrorServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHttpHandleErrorServiceComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHttpHandleErrorServiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
