import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ExpenseList } from './features/expenses/expense-list/expense-list';
import { AuthGuard } from './core/guards/auth-guard';
import { ExpenseAdd } from './features/expenses/expense-add/expense-add';
import { ExpenseEdit } from './features/expenses/expense-edit/expense-edit';

export const routes: Routes = [
    { path: '', redirectTo: 'expenses', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'expenses', component: ExpenseList, canActivate: [AuthGuard] },
    { path: 'expenses/add', component: ExpenseAdd, canActivate: [AuthGuard] },
    {
        path: 'expenses/edit/:id',
        component: ExpenseEdit,
        canActivate: [AuthGuard],
    },
];
