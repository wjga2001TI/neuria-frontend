import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { PaymentService } from 'app/core/service/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent implements OnInit{

  imgLogin = 'assets/images/auth-image.png';

  paymentForm: FormGroup;
  isSubmit: boolean = false;
  unauthorized: boolean = false
  success: boolean = false
  loading: boolean = false
  paymentMethods: any = []
  method: any = null
  constructor(private fb: FormBuilder, public router: Router,
    private paymentServ: PaymentService
  ){

    this.paymentForm = this.fb.group({
      reference: ['', [Validators.required,Validators.email]],
      payment_method_id: [1, Validators.required],
    });

  }

  ngOnInit(): void {
    this.getPayemntMethods()
  }

  selectPaymentMethod(e: any, method: any){
    e.preventDefault()
    if(!e.target.parentElement.classList.contains('selected')){
      this.paymentForm.controls['payment_method_id']?.setValue(method.id)
      this.method = method
      document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected')
      })
      e.target.parentElement.classList.add('selected')
    }
  }

  get reference() { return this.paymentForm.get('reference'); }
  get payment_method_id() { return this.paymentForm.get('payment_method_id'); }

  getPayemntMethods(){
    this.loading = true
    this.paymentServ.getPayemntMethods().subscribe((res: any) => {
      this.loading = false
      this.paymentMethods = res.payment_methods
      this.method = this.paymentMethods[0]
      console.log(this.paymentMethods)
    })
  }

  onSubmit() {
    console.log(this.paymentForm.value)
    this.paymentForm.markAllAsTouched()
    if (this.paymentForm.valid === true){
        this.isSubmit = true;
        this.loading = true;
        this.paymentServ.storePayment(this.paymentForm.value).subscribe((res: any) => {
          this.loading = false;
          if(res.success){
            this.router.navigate(['/dashboard'])
              this.unauthorized = false
              this.success = true
          }
        }, error => {
          this.isSubmit = false;
          this.loading = false;
          this.unauthorized = true
        })
      }
  }

}
