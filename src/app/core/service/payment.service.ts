import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {

  }

  getPayemntMethods(){
    return this.http.get(`${this.apiUrl}/payment_methods`).pipe(tap((res: any) => {

    }))
  }

  storePayment(payload: any){
    return this.http.post(`${this.apiUrl}/payments`, payload).pipe(tap((res: any) => {

    }))
  }

  getUserPayments(id: number){
    return this.http.get(`${this.apiUrl}/payments/user/${id}`).pipe(tap((res: any) => {

    }))
  }

  updatePayment(id: number, payload: any){
    return this.http.put(`${this.apiUrl}/payments/${id}`, payload).pipe(tap((res: any) => {

    }))
  }

}
