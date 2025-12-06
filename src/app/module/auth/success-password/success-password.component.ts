import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-password',
  templateUrl: './success-password.component.html',
  styleUrl: './success-password.component.scss'
})
export class SuccessPasswordComponent implements OnInit{

  imgLogin = 'assets/images/auth-image.png';

  loginForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  errorForm: string[] = [];
  isChecked: boolean = false

  constructor(public router: Router){

  }

  ngOnInit(): void {
  }

}
