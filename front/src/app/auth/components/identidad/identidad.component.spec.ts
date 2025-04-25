import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentidadComponent } from './identidad.component';

describe('IdentidadComponent', () => {
  let component: IdentidadComponent;
  let fixture: ComponentFixture<IdentidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
