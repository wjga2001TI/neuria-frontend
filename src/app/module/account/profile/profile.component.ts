import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { PaymentService } from 'app/core/service/payment.service';
// @ts-ignore
import intlTelInput from 'assets/lib/phone-number-validation/build/js/intlTelInput.min.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: any = {}
  formBuilder: FormBuilder;
  userForm: FormGroup;
  passwordForm: FormGroup;
  paymentForm: FormGroup;
  isSubmit: boolean = false;
  hidePass: boolean = true;
  errorForm: string[] = [];
  validConfirmPassword: boolean = true
  loading: boolean = false
  validPhone: boolean = false
  success: boolean = false

  constructor(private authServ: AuthenticationService,
    private paymentServ: PaymentService,
    private fb: FormBuilder,
    private router: Router
  ){
    this.getUser()
    this.userForm = this.fb.group({
      'name': ['', Validators.required],
      'company': [''],
      'country': [''],
      'city': [''],
      'email': ['', [Validators.required,Validators.email]],
      'phone': ['', [Validators.required,Validators.minLength(12),Validators.maxLength(13)]],
    });
    this.passwordForm = this.fb.group({
      'actual_password': ['', [Validators.required,Validators.minLength(6)]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'confirm_password': ['', [Validators.required,Validators.minLength(6)]],
    });
    this.paymentForm = this.fb.group({
      'payment_method_id': [null, [Validators.required]],
      'reference': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {


  }

  validatePhone(e?: any) {
    let phoneNumber: any
    if(e){
      phoneNumber = parsePhoneNumberFromString(e.target.value);
    }else{
      var phone: any = document.querySelector('#phone')
      phoneNumber = parsePhoneNumberFromString(phone.value);
    }
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
  get name() { return this.userForm.get('name'); }
  get company() { return this.userForm.get('company'); }
  get country() { return this.userForm.get('country'); }
  get city() { return this.userForm.get('city'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get actual_password() { return this.passwordForm.get('actual_password'); }
  get password() { return this.passwordForm.get('password'); }
  get confirmPassword() { return this.passwordForm.get('confirm_password'); }

  getUser() {
    this.loading = true
    this.authServ.getUser().subscribe((res: any) => {
      this.loading = false
      this.user = res.user
      var phone: any = document.querySelector('#phone')
      phone.value = res.user.phone
      this.validatePhone()
      intlTelInput(phone, {})
      let countries = document.querySelectorAll('.iti__country')
      countries.forEach((country) => {
        country.addEventListener('click', function(e: any){
          let code = e.target.getAttribute('data-dial-code')
          phone.value = `+${code}`
        })
      })
    }, err => {
      console.log(err)
      this.loading = false
    })
  }

  updateUserInfo() {
    this.isSubmit = true;
    console.log(this.userForm.valid)
    if (this.userForm.valid === true){
      this.loading = true;
      this.authServ.updateUser(this.user.id, this.userForm.value).subscribe((res: any) => {
        this.loading = false;
        console.log(res)
        if(res.success){

        }
      }, error => {
        this.loading = false;
      })
    }else{
      this.userForm.markAllAsTouched();
    }
    this.isSubmit = false;
  }

  updateUserPassword() {
    this.isSubmit = true;
    this.validConfirmPassword = this.password?.value == this.confirmPassword?.value ? true : false

    if (this.passwordForm.valid === true && this.validConfirmPassword){
      this.loading = true;
      this.authServ.updateUser(this.user.id, this.passwordForm.value).subscribe((res: any) => {
        this.loading = false;
        if(res.success){

        }
      }, error => {
        this.loading = false;
      })
    }else{
      this.passwordForm.markAllAsTouched();
    }
    this.isSubmit = false;
  }

  storePayment() {
    console.log(this.paymentForm.value)
    this.paymentForm.markAllAsTouched()
    if (this.paymentForm.valid === true){
        this.isSubmit = true;
        this.loading = true;
        this.paymentServ.storePayment(this.paymentForm.value).subscribe((res: any) => {
          this.loading = false;
          if(res.success){
            this.success = true
          }
        }, error => {
          this.isSubmit = false;
          this.loading = false;
        })
      }
  }

}
