import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  user: any = null

  constructor(private authServ: AuthenticationService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      if(res.success){
        this.user = res.user
        console.log(this.user.social_medias[0].pivot)
      }
    })
  }

  action(social: any, notification: boolean = false){
    if(social.pivot.connected && !notification){
      this.router.navigate([`dashboard/publish/${social.name}`])
    }else{
      this.router.navigate([`dashboard/form/${social.name}`])
    }
  }
}
