import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
// @ts-ignore
import intlTelInput from 'assets/lib/phone-number-validation/build/js/intlTelInput.min.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  formBuilder: FormBuilder;
  registerForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  errorForm: string[] = [];
  isChecked: boolean = false
  validConfirmPassword: boolean = true
  loading: boolean = false
  validPhone: boolean = false

  constructor(private fb: FormBuilder,
    private authServ: AuthenticationService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required,Validators.email]],
      'phone': ['', [Validators.required,Validators.minLength(12),Validators.maxLength(14)]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'confirm_password': ['', Validators.required]
    });
    setTimeout(() => {
      var phone: any = document.querySelector('#phone')
      intlTelInput(phone, {})
      let countries = document.querySelectorAll('.iti__country')
      countries.forEach((country) => {
        country.addEventListener('click', function(e: any){
          let code = e.target.getAttribute('data-dial-code')
          phone.value = `+${code}`
        })
      })
    }, 500);
  }

  validatePhone(e: any) {
    let phoneNumber: any = parsePhoneNumberFromString(e.target.value);
    if(phoneNumber && phoneNumber.isValid()){
      this.validPhone = true
    }else{
      this.validPhone = false
    }
  }

  showPassword(): boolean {
    this.hidePass = !this.hidePass;
    return false;
  }

  // Getters para acceder fácilmente a los controles del formulario
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirm_password'); }

  onSubmit() {
    this.isSubmit = true;
    this.validConfirmPassword = this.password?.value == this.confirmPassword?.value ? true : false
    console.log(this.registerForm.valid, this.validConfirmPassword)
    if (this.registerForm.valid === true && this.validConfirmPassword){
      this.loading = true;
      this.authServ.register(this.registerForm.value).subscribe((res: any) => {
        this.loading = false;
        if(res.success){
          if(res.data.user.role.id == 1){
            this.router.navigate(['/user'])
          }else{
            this.router.navigate(['/auth/subscription'])
          }
        }
      }, error => {
        this.loading = false;
      })
    }else{
      this.registerForm.markAllAsTouched();
    }
    this.isSubmit = false;
  }

}
