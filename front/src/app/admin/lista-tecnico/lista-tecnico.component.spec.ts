import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTecnicoComponent } from './lista-tecnico.component';

describe('ListaTecnicoComponent', () => {
  let component: ListaTecnicoComponent;
  let fixture: ComponentFixture<ListaTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
