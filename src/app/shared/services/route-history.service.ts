import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {

  private history: string[] = [];

  constructor(
    private router: Router
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(
          event.urlAfterRedirects
        );
      }
    });

  }

  get previousUrl(): string | null {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    return null;
  }
}
