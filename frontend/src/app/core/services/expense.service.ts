import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, take, tap } from 'rxjs';
import { Expense } from '../../shared/models/Expense';

@Injectable({
    providedIn: 'root',
})
export class ExpenseService {
    http = inject(HttpClient);
    config = inject(ConfigService);

    getExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${this.config.apiBackend}/expenses`);
    }

    getExpenseById(id: string): Observable<Expense> {
        return this.http
            .get<Expense>(`${this.config.apiBackend}/expenses/${id}`)
            .pipe(tap((response) => console.log(response)));
    }

    addExpense(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(
            `${this.config.apiBackend}/expenses`,
            expense
        );
    }

    updateExpense(expense: Expense): Observable<Expense> {
        console.log(expense);

        return this.http.put<Expense>(
            `${this.config.apiBackend}/expenses/${expense._id}`,
            { expense }
        );
    }

    deleteExpense(id: string): Observable<any> {
        return this.http.delete(`${this.config.apiBackend}/expenses/${id}`);
    }
}
