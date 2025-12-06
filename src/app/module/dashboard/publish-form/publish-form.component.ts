import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { SocialMediaService } from 'app/core/service/social-media.service';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrl: './publish-form.component.scss'
})
export class PublishFormComponent implements OnInit{

  user: any = null
  social: any = null
  isSubmit: boolean = false
  socialForm: FormGroup
  loading: boolean = false
  files: any = []

  constructor(private authServ: AuthenticationService,
    private socialServ: SocialMediaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){
    this.socialForm = this.fb.group({
      'post_date': '',
      'caption': '',
      'video_url': '',
      'url': '',
      'video_cover_url': '',
      'title': '',
      'description': '',
      'tags': '',
      'button_text': '',
      'event_date': '',
      'location_id': ''
    })
  }

  // Getters para acceder fácilmente a los controles del formulario
  get post_date() { return this.socialForm.get('post_date'); }
  get caption() { return this.socialForm.get('caption'); }
  get video_url() { return this.socialForm.get('video_url'); }
  get url() { return this.socialForm.get('url'); }
  get video_cover_url() { return this.socialForm.get('video_cover_url'); }
  get title() { return this.socialForm.get('title'); }
  get description() { return this.socialForm.get('description'); }
  get tags() { return this.socialForm.get('tags'); }
  get button_text() { return this.socialForm.get('button_text'); }
  get event_date() { return this.socialForm.get('event_date'); }
  get location_id() { return this.socialForm.get('location_id'); }

  openFiles(){
    let files: any = document.querySelector('#files')
    files.click()
  }

  loadFiles(e: any){
    console.log(e.target.files)
    this.files = e.target.files
  }

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

  publish(data: any){
    let form = new FormData()
    for (let i = 0; i < this.files.length; i++) {
      form.append('files[]', this.files[i])
    }
    form.append('social_media_id', this.social.id)
    form.append('data', JSON.stringify(data))
    this.loading = true
    this.isSubmit = true
    this.socialServ.post(form).subscribe((res: any) => {
      this.loading = false
      this.isSubmit = false
      console.log(res)
      this.router.navigate(['/dashboard'])
    }, err => {
      this.loading = false
      this.isSubmit = false
      console.log(err)
    })
  }

}
