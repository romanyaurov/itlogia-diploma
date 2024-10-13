import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessingComponent } from './modal-processing.component';

describe('ModalProcessingComponent', () => {
  let component: ModalProcessingComponent;
  let fixture: ComponentFixture<ModalProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProcessingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
