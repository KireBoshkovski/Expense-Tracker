import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'login',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    errorMessage = '';

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    onSubmit() {
        if (this.form.invalid) return;
        const { email, password } = this.form.value;

        this.authService.login(email!, password!).subscribe({
            next: () => this.router.navigate(['/expenses']),
            error: (err) =>
                (this.errorMessage = err.error?.message || 'Login failed'),
        });
    }
}
