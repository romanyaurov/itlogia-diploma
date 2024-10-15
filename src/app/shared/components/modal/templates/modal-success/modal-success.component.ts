import { Component } from '@angular/core';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';

@Component({
  selector: 'app-modal-success',
  standalone: false,
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss'
})
export class ModalSuccessComponent {

  constructor(
    protected modalService: CustomModalService
  ) { }

}
