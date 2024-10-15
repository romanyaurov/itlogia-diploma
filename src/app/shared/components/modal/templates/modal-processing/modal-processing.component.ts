import { Component } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-processing',
  standalone: false,
  templateUrl: './modal-processing.component.html',
  styleUrl: './modal-processing.component.scss'
})
export class ModalProcessingComponent {

  constructor(
    protected modalService: CustomModalService
  ) { }

}
