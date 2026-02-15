import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import env from './../../../environment/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = env.apiUrl;
  private userToken = 'userToken';

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      // Token válido encontrado
    } else {
      this.logout();
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    //return localStorage.getItem(this.userToken) || '';
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.userToken) || '';
    }
    return ''
  }

  login(payload: any){
    return this.http.post(`${this.apiUrl}/auth/login`, payload).pipe(tap((res: any) => {
      if(res.data.token !== undefined){
        localStorage.setItem(this.userToken, res.data.token)
      }
    }))
  }

  register(payload: any){
    return this.http.post(`${this.apiUrl}/auth/register`, payload).pipe(tap((res: any) => {
      if(res.data.token !== undefined){
        localStorage.setItem(this.userToken, res.data.token)
      }
    }))
  }

  getUser(){
    return this.http.get(`${this.apiUrl}/auth/user`).pipe(tap((res: any) => {

    }))
  }

  logout(){
    return this.http.get(`${this.apiUrl}/auth/logout`).pipe(tap((res: any) => {
        localStorage.removeItem(this.userToken);
        this.router.navigate(['/auth/login']);
    }, err =>{
      localStorage.removeItem(this.userToken);
      this.router.navigate(['/auth/login']);
    }))
  }

  sendLink(payload: any){
    return this.http.post(`${this.apiUrl}/auth/send-link`, payload).pipe(tap((res: any) => {
      //
    }))
  }

  resetPassword(payload: any){
    return this.http.post(`${this.apiUrl}/auth/reset-password`, payload).pipe(tap((res: any) => {
      //
    }))
  }

  checkRecoveryCode(payload: any){
    return this.http.post(`${this.apiUrl}/auth/check-code`, payload).pipe(tap((res: any) => {
      //
    }))
  }

  updateUser(id: number, payload: any){
    return this.http.put(`${this.apiUrl}/auth/users/${id}/update`, payload).pipe(tap((res: any) => {

    }))
  }

  getUsers(page: number, name: string){
    return this.http.get(`${this.apiUrl}/users?page=${page}&name=${name}`).pipe(tap((res: any) => {

    }))
  }

  deleteUser(id: any){
    return this.http.delete(`${this.apiUrl}/users/${id}`).pipe(tap((res: any) => {

    }))
  }

  getUserNotifications(){
    return this.http.get(`${this.apiUrl}/user/notifications`).pipe(tap((res: any) => {

    }))
  }
}
