import { Component, Input } from '@angular/core';
import { ArticleType } from 'src/types/article.type';
import { ServerImagePathPipe } from '../../pipes/server-image-path.pipe';
import { RouterModule } from '@angular/router';
import { MaxTextLengthPipe } from '../../pipes/max-text-length.pipe';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    ServerImagePathPipe,
    MaxTextLengthPipe,
    RouterModule
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {

  @Input() article!: ArticleType;

}
