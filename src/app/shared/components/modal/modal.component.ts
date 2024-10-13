import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomModalService } from '../../services/custom-modal.service';
import { CommonModule } from '@angular/common';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { ModalAgreementComponent } from './templates/modal-agreement/modal-agreement.component';
import { ModalProcessingComponent } from './templates/modal-processing/modal-processing.component';
import { ModalOrderComponent } from './templates/modal-order/modal-order.component';
import { ModalConsultationComponent } from './templates/modal-consultation/modal-consultation.component';
import { ModalSuccessComponent } from './templates/modal-success/modal-success.component';
import { ConsultationRequestType } from 'src/types/consultation-request.type';
import { OrderRequestType } from 'src/types/order-request.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalAgreementComponent,
    ModalProcessingComponent,
    ModalOrderComponent,
    ModalConsultationComponent,
    ModalSuccessComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: []
})
export class ModalComponent implements OnInit {

  protected modalTemplatesEnum = ModalTemplatesEnum;
  protected currentTemplate: TemplateRef<any> | null = null;
  protected orderType: OrderServicesEnum | null = null;
  protected modalService: CustomModalService = inject(CustomModalService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  @ViewChild(
    'modalFormConsultation',
    { static: true }
  ) modalFormConsultation!: TemplateRef<any>;

  @ViewChild(
    'modalFormOrder',
    { static: true }
  ) modalFormOrder!: TemplateRef<any>;

  @ViewChild(
    'modalAgreementInfo',
    { static: true }
  ) modalAgreementInfo!: TemplateRef<any>;

  @ViewChild(
    'modalProcessingInfo',
    { static: true }
  ) modalProcessingInfo!: TemplateRef<any>;

  @ViewChild(
    'modalSuccess',
    { static: true }
  ) modalSuccess!: TemplateRef<any>;

  constructor(
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    switch (this.modalService.modalState()) {
      case ModalTemplatesEnum.modalFormConsultation:
        return this.currentTemplate = this.modalFormConsultation;
      case ModalTemplatesEnum.modalFormOrder:
        if (this.modalService.modalOrderType()) {
          this.orderType = this.modalService.modalOrderType();
        }
        return this.currentTemplate = this.modalFormOrder;
      case ModalTemplatesEnum.modalAgreementInfo:
        return this.currentTemplate = this.modalAgreementInfo;
      case ModalTemplatesEnum.modalProcessingInfo:
        return this.currentTemplate = this.modalProcessingInfo;
      default:
        return this.currentTemplate = null;
    }
  }

  protected sendRequest(requestData: ConsultationRequestType | OrderRequestType) {
    this.modalService.sendCallbackRequest(requestData)
      .subscribe({
        next: () => {
          this.currentTemplate = this.modalSuccess;
        },
        error: (err: string) => {
          this.snackBar.open(err);
        }
      })
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (targetElement === this.elRef.nativeElement) {
      this.modalService.close();
    }
  }

}
