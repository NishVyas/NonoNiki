import { TestBed } from '@angular/core/testing';

import { NonoNikiShopFormService } from './nono-niki-shop-form.service';

describe('NonoNikiShopFormService', () => {
  let service: NonoNikiShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonoNikiShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
