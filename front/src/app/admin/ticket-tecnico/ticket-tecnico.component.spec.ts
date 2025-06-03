import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTecnicoComponent } from './ticket-tecnico.component';

describe('TicketTecnicoComponent', () => {
  let component: TicketTecnicoComponent;
  let fixture: ComponentFixture<TicketTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
