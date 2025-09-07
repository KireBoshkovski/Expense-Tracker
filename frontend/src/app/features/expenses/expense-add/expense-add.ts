// expense-add.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../shared/models/Expense';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
    selector: 'expense-add',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar],
    templateUrl: './expense-add.html',
    styleUrl: './expense-add.css',
})
export class ExpenseAdd implements OnInit {
    expenseService = inject(ExpenseService);
    router = inject(Router);
    fb = inject(FormBuilder);

    isSubmitting = false;

    expenseForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        amount: ['', [Validators.required, Validators.min(0.01)]],
        category: ['', Validators.required],
        date: [this.getCurrentDate(), Validators.required],
    });

    ngOnInit() {
        setTimeout(() => {
            const titleInput = document.getElementById('title');
            if (titleInput) {
                titleInput.focus();
            }
        }, 100);
    }

    getCurrentDate(): string {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    onSave(expenseFormValue: any) {
        if (this.expenseForm.invalid) {
            this.expenseForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;

        const newExpense: Omit<Expense, 'id'> = {
            title: expenseFormValue.title.trim(),
            amount: parseFloat(expenseFormValue.amount),
            category: expenseFormValue.category,
            date: expenseFormValue.date,
        };

        this.expenseService.addExpense(newExpense).subscribe({
            next: () => {
                alert('Expense added successfully!');
                this.router.navigate(['/expenses']);
            },
            error: (err) => {
                console.error(err);
                alert('Failed to add expense. Please try again.');
                this.isSubmitting = false;
            },
            complete: () => {
                this.isSubmitting = false;
            },
        });
    }

    resetForm() {
        this.expenseForm.reset();
        this.expenseForm.patchValue({
            date: this.getCurrentDate(),
        });
    }
}
