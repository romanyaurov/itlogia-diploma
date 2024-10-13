import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentType } from 'src/types/comment.type';
import { SvgIconComponent } from '../common/svg-icon/svg-icon.component';
import { StaticImagePathPipe } from '../../pipes/static-image-path.pipe';
import { ReviewDatetimePipe } from '../../pipes/review-datetime.pipe';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CommentActionsEnum } from 'src/types/comment-actions.enum';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    SvgIconComponent,
    StaticImagePathPipe,
    ReviewDatetimePipe
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {

  @Input() comment!: CommentType;

  protected commentActionsEnum = CommentActionsEnum;

  @Output() actionEmitter: EventEmitter<{
    commentId: string,
    action: CommentActionsEnum
  }> = new EventEmitter();

  constructor(
    protected authService: AuthService
  ) { }

  protected emitCommentAction(
    action: CommentActionsEnum,
    event: Event
  ): void {
    if (!this.authService.isAuth) {
      event.preventDefault();
    } else {
      this.actionEmitter.emit({
        commentId: this.comment.id,
        action: action
      });
    }
  }

}
