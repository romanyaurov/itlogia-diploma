import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomModalService } from '../../services/custom-modal.service';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { ConsultationRequestType } from 'src/types/consultation-request.type';
import { OrderRequestType } from 'src/types/order-request.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  protected modalTemplatesEnum = ModalTemplatesEnum;
  protected currentTemplate: TemplateRef<any> | null = null;
  protected orderType: OrderServicesEnum | null = null;

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
    private elRef: ElementRef,
    protected modalService: CustomModalService,
    private snackBar: MatSnackBar,
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
