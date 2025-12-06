import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { PaymentService } from 'app/core/service/payment.service';

@Component({
  selector: 'app-users-subscription',
  templateUrl: './users-subscription.component.html',
  styleUrl: './users-subscription.component.scss'
})
export class UsersSubscriptionComponent implements OnInit{

  payments: any[] = []
  user: any = null
  isSubmit: boolean = false;
  loading: boolean = false
  page: number = 1
  totalPages: number = 1
  user_id: any = null

  constructor(private authServ: AuthenticationService,
    private paymentServ: PaymentService,
    private route: ActivatedRoute
  ){
    this.user_id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(){
    this.getUserPayments()
  }

  getUserPayments(){
    this.loading = true;
    this.paymentServ.getUserPayments(this.user_id).subscribe((res: any) => {
      this.loading = false;
      this.payments = res.payments
      this.user = res.user
      console.log(res)
    }, (error: any) => {
      console.log(error)
      this.loading = false;
    })
  }

  updatePayment(id: number, status_id: number){
    let payload = { status_id }
    this.loading = true;
    this.paymentServ.updatePayment(id, payload).subscribe((res: any) => {
      this.loading = false;
      if(res.success){
        this.getUserPayments()
      }
    }, (error: any) => {
      console.log(error)
      this.loading = false;
    })
  }

}
