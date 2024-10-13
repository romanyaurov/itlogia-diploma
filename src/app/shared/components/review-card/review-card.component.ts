import { Component, Input } from '@angular/core';
import { StaticImagePathPipe } from '../../pipes/static-image-path.pipe';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    StaticImagePathPipe
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {

  @Input() review!: { image: string, name: string, review: string };

}
