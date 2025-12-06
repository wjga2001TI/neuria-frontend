import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit{

  centered: boolean = false
  scroll: boolean = false

  // Para gestionar la suscripción y evitar fugas de memoria
  private routerSubscription: Subscription;

  constructor(private router: Router){

  }

  ngOnInit() {
    if(window.location.href.includes('dashboard/')){
      this.centered = true
    }
    this.routerSubscription = this.router.events.pipe(
      // 2. Filtra los eventos para quedarte solo con NavigationEnd
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: any) => {
      // 3. Aquí va tu lógica
      console.log('Ruta cambiada a:', e);
      if(e.urlAfterRedirects.includes('form') || e.urlAfterRedirects.includes('publish')){
        this.centered = true
        this.scroll = false
      }else if(e.urlAfterRedirects.includes('calendar') ||
      e.urlAfterRedirects.includes('notification') ||
      e.urlAfterRedirects.includes('account')){
        this.scroll = false
      }else{
        this.centered = false
        this.scroll = true
      }
    });
  }

  ngOnDestroy() {
    // 4. ¡Muy importante! Cancela la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
