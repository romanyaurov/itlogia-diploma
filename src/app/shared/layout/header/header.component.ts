import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MenuType } from 'src/types/menu-item.type';
import { SvgIconComponent } from '../../components/common/svg-icon/svg-icon.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() menuItems!: MenuType[];

  constructor(
    protected authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  protected logout():void {
    this.authService.logout()
      .subscribe({
        next: () => { this.snackBar.open('Вы вышли из системы') },
        error: () => { this.snackBar.open('Вы вышли из системы') }
      });
  }

}
