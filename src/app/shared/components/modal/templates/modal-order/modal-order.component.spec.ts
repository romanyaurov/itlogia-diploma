import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderComponent } from './modal-order.component';

describe('ModalOrderComponent', () => {
  let component: ModalOrderComponent;
  let fixture: ComponentFixture<ModalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
