import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReporteComponent } from './admin-reporte.component';

describe('AdminRepoprteComponent', () => {
  let component: AdminReporteComponent;
  let fixture: ComponentFixture<AdminReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
