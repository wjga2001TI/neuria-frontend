import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import env from './../../../environment/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private apiUrl = env.apiUrl;

  constructor(private http: HttpClient, private router: Router) {

  }

  storeSocialData(payload: any){
    return this.http.put(`${this.apiUrl}/social/data`, payload).pipe(tap((res: any) => {

    }))
  }

  post(payload: any){
    return this.http.post(`${this.apiUrl}/posts`, payload).pipe(tap((res: any) => {

    }))
  }

}
