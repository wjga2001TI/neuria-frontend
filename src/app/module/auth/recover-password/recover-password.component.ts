import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit{

  imgLogin = 'assets/images/auth-image.png';

  loginForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  errorForm: string[] = [];
  unauthorized: boolean = false
  success: boolean = false
  loading: boolean = false

  constructor(private fb: FormBuilder, public router: Router,
    private authServ: AuthenticationService
  ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]]
    });

  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }

  onSubmit() {
      this.isSubmit = true;
      this.loginForm.markAllAsTouched()
      if (this.loginForm.valid === true){
        this.loading = true;
        this.authServ.sendLink(this.loginForm.value).subscribe((res: any) => {
          this.loading = false;
          if(res.success){
              this.unauthorized = false
              this.success = true
              localStorage.setItem('recoverEmail', this.loginForm.value.email)
          }
        }, error => {
          this.loading = false;
          this.unauthorized = true
        })
      }
  }

}
