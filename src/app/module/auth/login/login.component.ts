import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  imgLogin = 'assets/images/auth-image.png';

  loginForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  errorForm: string[] = [];
  isChecked: boolean = false
  unauthorized: boolean = false
  loading: boolean = false

  constructor(private fb: FormBuilder,
    private authServ: AuthenticationService,
    private router: Router){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  // Getters para acceder fácilmente a los controles del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  showPassword(): boolean {
    this.hidePass = !this.hidePass;
    return false;
  }

  onSubmit() {
    this.isSubmit = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid === true){
      this.loading = true;
      this.authServ.login(this.loginForm.value).subscribe((res: any) => {
        this.loading = false;
        if(res.success){
          if(res.data.user.role.id == 1){
            this.router.navigate(['/user'])
          }else{
            this.router.navigate(['/dashboard'])
          }
          this.unauthorized = false
        }
      }, error => {
        this.loading = false;
        this.unauthorized = true
      })
    }else{
    }
    this.isSubmit = false;
  }

}
