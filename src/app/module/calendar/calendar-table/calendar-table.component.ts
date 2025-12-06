import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { PostService } from 'app/core/service/post.service';

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrl: './calendar-table.component.scss'
})
export class CalendarTableComponent implements OnInit{

  notifications: any[] = []
  user: any = null
  loading: boolean = false
  posts: any[] = []

  currentDate: any = new Date();
  currentMonth: any = this.currentDate.getMonth();
  currentYear: any = this.currentDate.getFullYear();

  monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  dayNames = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

  calendarDays: any
  currentMonthElement: any
  monthSelect: any
  prevMonthBtn: any
  nextMonthBtn: any

  constructor(private authServ: AuthenticationService,
    private postServ: PostService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getUser()
    this.getPostsOfMonth()
    var el = this
    this.calendarDays = document.getElementById('calendar-days');
    this.currentMonthElement = document.getElementById('current-month');
    this.monthSelect = document.getElementById('month-select');
    this.prevMonthBtn = document.getElementById('prev-month');
    this.nextMonthBtn = document.getElementById('next-month');
    // Cambiar al mes anterior
    this.prevMonthBtn.addEventListener('click', function() {
        el.currentMonth = el.currentMonth - 1;
        if (el.currentMonth < 0) {
            el.currentMonth = 11;
            el.currentYear--;
        }
        el.updateMonthYear();
        el.generateCalendar();
        el.monthSelect.value = el.currentMonth;
    });

    // Cambiar al mes siguiente
    this.nextMonthBtn.addEventListener('click', function() {
        el.currentMonth++;
        if (el.currentMonth > 11) {
            el.currentMonth = 0;
            el.currentYear++;
        }
        el.updateMonthYear();
        el.generateCalendar();
        el.monthSelect.value = el.currentMonth;
    });

    // Cambiar mes mediante el selector
    this.monthSelect.addEventListener('change', function() {
        el.currentMonth = parseInt(el.monthSelect.value);
        el.updateMonthYear();
        el.generateCalendar();
    });

  }

  // Inicializar el calendario
  initCalendar() {
    this.updateMonthYear();
    this.generateCalendar();
    this.monthSelect.value = this.currentMonth;
  }

  // Actualizar el mes y año mostrado
  updateMonthYear() {
    this.currentMonthElement.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  // Generar el calendario
  generateCalendar() {
    this.calendarDays.innerHTML = '';

    // Obtener primer día del mes y cantidad de días
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
    let startingDay = firstDay.getDay();
    // Ajustar para que la semana comience en Lunes
    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    // Crear celdas vacías para los días anteriores al primer día del mes
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'empty');
      this.calendarDays.appendChild(emptyDay);
    }

    // Crear celdas para cada día del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');

      const dayNumber: any = document.createElement('div');
      dayNumber.classList.add('day-number');
      let zero: string = day < 10 ? '0' : ''
      dayNumber.textContent = `${zero}${day}`;

      const socialIconsContainer = document.createElement('div');
      socialIconsContainer.classList.add('social-icons');

      dayElement.appendChild(dayNumber);
      dayElement.appendChild(socialIconsContainer);
      this.calendarDays.appendChild(dayElement);

      // Agregar iconos de redes sociales si existen para este día
      const dayData = this.posts.filter(item => item.day === day);
      dayData.forEach(data => {
        let link:any = document.createElement('a');
        const icon = document.createElement('i');
        icon.classList.add('social-icon', 'fa', 'fa-'+data.social_media.icon);

        // Usar la primera letra como icono (puedes reemplazar con iconos reales)
        //icon.src = `assets/images/${data.social_media.icon}.png`;

        link.appendChild(icon);
        socialIconsContainer.appendChild(link);
        var el = this
        link.addEventListener('click', function(e: any) {
          e.preventDefault();
          el.router.navigate([`/calendar/posts/${data.date}`])
        });
      });
    }
  }

  // Simular la obtención de datos desde una API
  fetchSocialMediaData() {
      // En una aplicación real, aquí harías una llamada fetch a tu API
      console.log("Obteniendo datos de publicaciones...");

      // Después de obtener los datos, actualizarías el calendario
      // Por ahora usamos los datos de ejemplo definidos arriba
      this.generateCalendar();
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      this.user = res.user
    })
  }

  getPostsOfMonth(){
    this.postServ.getPostOfMonth().subscribe((res: any) => {
      console.log(res)
      this.posts = res.posts
      this.initCalendar()
    })
  }

}
