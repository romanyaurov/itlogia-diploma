import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalAgreementComponent } from './templates/modal-agreement/modal-agreement.component';
import { ModalConsultationComponent } from './templates/modal-consultation/modal-consultation.component';
import { ModalOrderComponent } from './templates/modal-order/modal-order.component';
import { ModalSuccessComponent } from './templates/modal-success/modal-success.component';
import { ModalProcessingComponent } from './templates/modal-processing/modal-processing.component';
import { SvgIconComponent } from '../common/svg-icon/svg-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';



@NgModule({
  declarations: [
    ModalComponent,
    ModalAgreementComponent,
    ModalConsultationComponent,
    ModalOrderComponent,
    ModalSuccessComponent,
    ModalProcessingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneMaskDirective,
    SvgIconComponent
  ],
  exports: [
    ModalComponent,
  ]
})
export class ModalModule { }
