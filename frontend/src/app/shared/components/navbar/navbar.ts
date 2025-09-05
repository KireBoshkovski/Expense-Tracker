import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'navbar',
    imports: [RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    router = inject(Router);
    authService = inject(AuthService);

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
