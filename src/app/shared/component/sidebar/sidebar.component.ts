import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  macaw = 'assets/images/logo.png'
  menu = 'assets/images/menu.png'

  user: any = null
  loading: boolean = false

  constructor(private authServ: AuthenticationService){

  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      if(res.success){
        this.user = res.user
      }
    })
  }

  logout(){
    this.loading = true
    this.authServ.logout().subscribe((res: any) => {
      this.loading = false
    }, err => {
      this.loading = false
    })
  }

  toggleClass(e: any){
    let target = e.target.classList.contains('title') || e.target.classList.contains('fa')
    ? e.target.parentElement : e.target
    if(!target.classList.contains('active')){
      document.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active')
      })
      target.classList.add('active')
    }
  }
}
