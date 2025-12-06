import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent implements OnInit{

  imgLogin = 'assets/images/auth-image.png';

  loginForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  validConfirmPassword: boolean = true
  success: boolean = false
  email: string = ''
  loading: boolean = false

  constructor(private fb: FormBuilder,
  public router: Router,
  private authServ: AuthenticationService,
  private activatedRoute: ActivatedRoute){
    this.email = localStorage.getItem('recoverEmail') || ''
    this.loginForm = this.fb.group({
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'confirm_password': ['', Validators.required]
    });
    // Capturar el parámetro 'code' de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code']; // Si no existe, será `undefined`
      // Si necesitas hacer algo con el código (ej: validarlo)
      if (code) {
        this.checkRecoveryCode(code)
      }else{
        //this.router.navigate(['/auth/recover-password'])
      }
    });
  }

  ngOnInit(): void {
  }

  checkRecoveryCode(code: string){
    let payload = {
      email: this.email,
      code
    }
    this.loading = true;
    this.authServ.checkRecoveryCode(payload).subscribe((res: any) => {
      this.loading = false;
    }, error => {
      this.loading = false;
      this.router.navigate(['/auth/recover-password'])
    })
  }

  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirm_password'); }

  mostrarClave(): boolean {
    this.hidePass = !this.hidePass;
    return false;
  }

  onSubmit() {
    this.isSubmit = true;
    this.validConfirmPassword = this.password?.value == this.confirmPassword?.value ? true : false
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid === true && this.validConfirmPassword){
      let payload = {
        ...this.loginForm.value,
        email: this.email
      }
      this.loading = true;
      this.authServ.resetPassword(payload).subscribe((res: any) => {
        this.loading = false;
        if(res.success){
            this.success = true
            localStorage.removeItem('recoverEmail')
            setTimeout(() => {
              this.router.navigate(['/auth/success-password'])
            }, 1500);
        }
      }, error => {
        this.loading = false;
        this.isSubmit = false;
      })
    }else{
        this.isSubmit = false;
    }
  }

}
