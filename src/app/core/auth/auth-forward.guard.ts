import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { RouteHistoryService } from "src/app/shared/services/route-history.service";

@Injectable({
    providedIn: 'root'
})
export class AuthForwardGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private routeHistoryResvice: RouteHistoryService
    ) { }

    canActivate(): boolean {
        if (this.authService.isAuth) {
            const previousUrl = this.routeHistoryResvice.previousUrl;

            if (previousUrl) {
                this.router.navigateByUrl(previousUrl);
            } else {
                this.router.navigate(['/']);
            }

            return false;
        }

        return true;
    }

}