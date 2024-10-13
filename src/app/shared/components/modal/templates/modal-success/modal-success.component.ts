import { Component, inject } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss'
})
export class ModalSuccessComponent {

  protected modalService: CustomModalService = inject(CustomModalService);

}
