import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notifications: any[] = []
  user: any = null

  constructor(private authServ: AuthenticationService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getUser()
    this.getNotifications()
  }

  getNotifications(){
    this.authServ.getUserNotifications().subscribe((res: any) => {
      this.notifications = res.notifications
      console.log(this.notifications)
    })
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      this.user = res.user
    })
  }

}
