import { Component, inject, Input } from '@angular/core';
import { ServiceInfoType } from 'src/types/service-info.type';
import { CustomModalService } from '../../services/custom-modal.service';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { ServicePriceFormatPipe } from '../../pipes/service-price-format.pipe';
import { StaticImagePathPipe } from '../../pipes/static-image-path.pipe';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    ServicePriceFormatPipe,
    StaticImagePathPipe
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {

  @Input() service!: ServiceInfoType;
  protected modalTemplates = ModalTemplatesEnum;
  protected orderServices = OrderServicesEnum;
  protected modalService: CustomModalService = inject(CustomModalService);

}
