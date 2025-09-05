import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private env: any = (window as any).env || {};

    get apiBackend(): string {
        return this.env.API_BACKEND || 'http://localhost:5000/api';
    }

    get apiAuth(): string {
        return this.env.API_AUTH || 'http://localhost:4000/api/auth';
    }
}
