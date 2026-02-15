import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { SocialMediaService } from 'app/core/service/social-media.service';

@Component({
  selector: 'app-social-form',
  templateUrl: './social-form.component.html',
  styleUrl: './social-form.component.scss'
})
export class SocialFormComponent implements OnInit{

  user: any = null
  social: any = null
  isSubmit: boolean = false
  socialForm: FormGroup
  loading: boolean = false

  constructor(private authServ: AuthenticationService,
    private socialServ: SocialMediaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){
    this.socialForm = this.fb.group({
      'access_token': '',
      'account_id': '',
      'name': '',
      'url': '',
      'username': '',
      'password': '',
      'phone': '',
      'api_key': ''
    })
  }

  // Getters para acceder fácilmente a los controles del formulario
  get access_token() { return this.socialForm.get('access_token'); }
  get account_id() { return this.socialForm.get('account_id'); }
  get name() { return this.socialForm.get('name'); }
  get url() { return this.socialForm.get('url'); }
  get username() { return this.socialForm.get('username'); }
  get password() { return this.socialForm.get('password'); }
  get phone() { return this.socialForm.get('phone'); }
  get api_key() { return this.socialForm.get('api_key'); }
  get api_secret() { return this.socialForm.get('api_secret'); }
  get access_secret() { return this.socialForm.get('access_secret'); }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      if(res.success){
        this.user = res.user
        let socialName = this.route.snapshot.paramMap.get('social')
        this.social = this.user.social_medias.find((s: any) => s.name == socialName)
      }
    })
  }

  connect(data: any){
    let payload = {
      social_media_id: this.social.id,
      data
    }
    this.loading = true
    this.isSubmit = true
    this.socialServ.storeSocialData(payload).subscribe((res: any) => {
      this.loading = false
      this.isSubmit = false
      this.router.navigate(['/dashboard'])
    }, err => {
      this.loading = false
      this.isSubmit = false
      console.log(err)
    })
  }
}
