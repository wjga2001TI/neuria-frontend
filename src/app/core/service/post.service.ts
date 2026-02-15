import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import env from './../../../environment/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = env.apiUrl;

  constructor(private http: HttpClient, private router: Router) {

  }

  getPostOfMonth(){
    return this.http.get(`${this.apiUrl}/posts`).pipe(tap((res: any) => {

    }))
  }

}
