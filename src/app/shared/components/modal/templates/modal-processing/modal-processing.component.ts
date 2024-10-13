import { Component, inject } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-processing',
  standalone: true,
  imports: [],
  templateUrl: './modal-processing.component.html',
  styleUrl: './modal-processing.component.scss'
})
export class ModalProcessingComponent {

  protected modalService: CustomModalService = inject(CustomModalService);

}
