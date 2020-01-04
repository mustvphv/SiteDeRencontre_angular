/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckPseudoService } from './checkPseudo.service';

describe('Service: CheckPseudo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPseudoService]
    });
  });

  it('should ...', inject([CheckPseudoService], (service: CheckPseudoService) => {
    expect(service).toBeTruthy();
  }));
});
