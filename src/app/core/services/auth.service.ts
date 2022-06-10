import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/delay';

import { of, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    SERVER_URL = 'http://localhost:3000';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.SERVER_URL}/auth/login`, { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.token));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): any {
        return JSON.parse(this.localStorage.getItem('currentUser'));
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}
