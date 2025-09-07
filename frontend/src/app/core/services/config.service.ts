import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private env: any = (window as any).env || {};

    get apiBackend(): string {
        return '/api';
    }

    get apiAuth(): string {
        return '/auth';
    }
}
