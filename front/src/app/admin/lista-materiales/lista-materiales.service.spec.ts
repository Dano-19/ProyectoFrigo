import { TestBed } from '@angular/core/testing';

import { ListaMaterialesService } from './lista-materiales.service';

describe('ListaMaterialesService', () => {
  let service: ListaMaterialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaMaterialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
