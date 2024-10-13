import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlideInfoType } from 'src/types/slide-info.type';
import { StaticImagePathPipe } from '../../pipes/static-image-path.pipe';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    StaticImagePathPipe
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent {

  @Input() slide!: SlideInfoType;

}
