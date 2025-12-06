import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {

  }

  getPostOfMonth(){
    return this.http.get(`${this.apiUrl}/posts`).pipe(tap((res: any) => {

    }))
  }

}
