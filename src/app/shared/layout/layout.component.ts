import { Component, inject } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from '@angular/router';
import { CustomModalService } from '../services/custom-modal.service';
import { HttpClient } from '@angular/common/http';
import { MenuType } from 'src/types/menu-item.type';
import { map, Observable } from 'rxjs';
import { ModalModule } from '../components/modal/modal.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    ModalModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  protected isModalOpen: boolean = false;
  protected menuItems: MenuType[] = [];

  constructor(
    private modalService: CustomModalService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.modalService.isModalOpen$
      .subscribe((isModalOpen: boolean) => {
        this.isModalOpen = isModalOpen;
      });

    this.loadMenuItems().subscribe({
      next: (menuItems) => { this.menuItems = menuItems }
    })
  }

  private loadMenuItems(): Observable<MenuType[]> {
    return this.http.get<{ items: MenuType[] }>(
      './assets/jsons/menu-items.json'
    ).pipe(
      map(res => res.items)
    );
  }
}
