import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../shared/models/Expense';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
    selector: 'expense-list',
    imports: [DatePipe, RouterLink, Navbar],
    templateUrl: './expense-list.html',
    styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit {
    expenseService = inject(ExpenseService);

    expenses: Expense[] = [];

    loading: boolean = true;
    errorMessage: string | undefined;

    ngOnInit(): void {
        this.loadExpenses();
    }

    loadExpenses() {
        this.loading = true;
        this.expenseService.getExpenses().subscribe({
            next: (data) => {
                this.expenses = data;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = err.error.error;
            },
        });
    }

    onDelete(id: string) {
        this.expenseService.deleteExpense(id).subscribe(() => {
            this.loadExpenses();
        });
    }
}
