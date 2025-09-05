import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'register',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    errorMessage = '';
    successMessage = '';

    form = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    onSubmit() {
        if (this.form.invalid) return;

        const { username, email, password } = this.form.value;
        console.log(username, email, password);
        this.authService.register(username!, email!, password!).subscribe({
            next: () => {
                this.successMessage = 'Registration successful! Please log in.';
                setTimeout(() => this.router.navigate(['/login']), 1500);
            },
            error: (err) =>
                (this.errorMessage =
                    err.error?.message || 'Registration failed'),
        });
    }
}
