import { Component, inject, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Expense } from '../../../shared/models/Expense';
import { ExpenseService } from '../../../core/services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
    selector: 'expense-edit',
    imports: [AsyncPipe, ReactiveFormsModule, Navbar],
    templateUrl: './expense-edit.html',
    styleUrl: './expense-edit.css',
})
export class ExpenseEdit implements OnInit {
    expenseService = inject(ExpenseService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    fb = inject(FormBuilder);

    expenseForm: FormGroup = this.fb.group({
        _id: ['', Validators.required],
        title: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        date: ['', Validators.required],
    });

    expense$: Observable<Expense | undefined> = this.route.paramMap.pipe(
        switchMap((params) => {
            const id = params.get('id');
            return id ? this.expenseService.getExpenseById(id) : of(undefined);
        })
    );

    ngOnInit(): void {
        this.expense$.subscribe((expense) => {
            if (expense && expense.date) {
                const formattedDate = new Date(expense.date)
                    .toISOString()
                    .substring(0, 10);

                this.expenseForm.patchValue({
                    ...expense,
                    date: formattedDate,
                });
            }
        });
    }

    onSave(expenseFormValue: any) {
        if (this.expenseForm.invalid) {
            return;
        }

        const updatedExpense: Expense = {
            ...expenseFormValue,
            date: new Date(expenseFormValue.date),
        };

        this.expenseService.updateExpense(updatedExpense).subscribe({
            next: () => {
                alert('Expense updated successfully!');
                this.router.navigate(['/expenses']);
            },
            error: (err) => console.error('Error updating expense:', err),
        });
    }
}
