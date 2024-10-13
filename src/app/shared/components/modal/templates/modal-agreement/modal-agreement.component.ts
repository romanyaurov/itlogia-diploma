import { Component, inject } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-agreement',
  standalone: true,
  imports: [],
  templateUrl: './modal-agreement.component.html',
  styleUrl: './modal-agreement.component.scss'
})
export class ModalAgreementComponent {

  protected modalService: CustomModalService = inject(CustomModalService);

}
