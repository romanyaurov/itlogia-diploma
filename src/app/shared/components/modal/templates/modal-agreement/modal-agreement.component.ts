import { Component } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-agreement',
  standalone: false,
  templateUrl: './modal-agreement.component.html',
  styleUrl: './modal-agreement.component.scss'
})
export class ModalAgreementComponent {

  constructor(
    protected modalService: CustomModalService
  ) { }

}
