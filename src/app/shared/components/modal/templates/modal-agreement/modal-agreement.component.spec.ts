import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgreementComponent } from './modal-agreement.component';

describe('ModalAgreementComponent', () => {
  let component: ModalAgreementComponent;
  let fixture: ComponentFixture<ModalAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
