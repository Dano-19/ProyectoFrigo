import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPedidoComponent } from './admin-pedido.component';

describe('AdminPedidoComponent', () => {
  let component: AdminPedidoComponent;
  let fixture: ComponentFixture<AdminPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
