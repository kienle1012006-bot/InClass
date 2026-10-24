import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProductHttpHandleErrorService } from './product-http-handle-error-service';

describe('ProductHttpHandleErrorService', () => {
  let service: ProductHttpHandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProductHttpHandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
