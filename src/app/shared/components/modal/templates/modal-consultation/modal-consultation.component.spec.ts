import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultationComponent } from './modal-consultation.component';

describe('ModalConsultationComponent', () => {
  let component: ModalConsultationComponent;
  let fixture: ComponentFixture<ModalConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
