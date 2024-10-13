import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '../../components/common/svg-icon/svg-icon.component';
import { CustomModalService } from '../../services/custom-modal.service';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { MenuType } from 'src/types/menu-item.type';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  public modalTemplatesEnum = ModalTemplatesEnum;

  @Input() menuItems!: MenuType[];

  constructor(
    protected modalService: CustomModalService
  ) { }

}
