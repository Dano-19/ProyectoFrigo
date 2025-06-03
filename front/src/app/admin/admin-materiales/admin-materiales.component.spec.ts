import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaterialesComponent } from './admin-materiales.component';

describe('AdminMaterialesComponent', () => {
  let component: AdminMaterialesComponent;
  let fixture: ComponentFixture<AdminMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
