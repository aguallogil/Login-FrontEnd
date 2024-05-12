import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly storageKey = 'authToken';
  private readonly userKey = 'authUserData';
  private secretKey = environment.secretKey;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, userDetails: any }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map(response => {
        this.storeToken(response.token);
        this.storeUserData(response.userDetails);
        return response;
      }),
      catchError(error => {
        console.log(error)
        throw error;
      })
    );
  }

  storeToken(token: string): void {
    const encryptedToken = CryptoJS.AES.encrypt(token, this.secretKey).toString();
    localStorage.setItem(this.storageKey, encryptedToken);
  }
  storeUserData(data: any): void {
    const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    localStorage.setItem(this.userKey, encryptedUserData);
  }
  getUserData(): string|null {
    const encryptedUserData = localStorage.getItem(this.userKey);
    return encryptedUserData ? JSON.parse(CryptoJS.AES.decrypt(encryptedUserData, this.secretKey).toString(CryptoJS.enc.Utf8)) : null;
  }

  getToken(): string|null {
    const encryptedToken = localStorage.getItem(this.storageKey);
    return encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, this.secretKey).toString(CryptoJS.enc.Utf8) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
