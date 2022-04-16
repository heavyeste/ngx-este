import { TestBed } from '@angular/core/testing';

import { NgxEsteService } from './ngx-este.service';

describe('NgxEsteService', () => {
  let service: NgxEsteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxEsteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
