import { TestBed } from '@angular/core/testing';

import { CheckEmailService } from './checkEmail.service';

describe('CheckEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckEmailService = TestBed.get(CheckEmailService);
    expect(service).toBeTruthy();
  });
});
