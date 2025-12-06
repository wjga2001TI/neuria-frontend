import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/service/authentication.service';
import { PostService } from 'app/core/service/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  posts: any[] = []
  user: any = null
  isSubmit: boolean = false;
  loading: boolean = false
  page: number = 1
  totalPages: number = 1
  user_id: any = null
  date: string = ''

  constructor(private authServ: AuthenticationService,
    private postServ: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ){
    this.user_id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(){
    let date: any = this.route.snapshot.paramMap.get('date')
    console.log(date)
    date = new Date(date)
    console.log(date)
    this.date = this.datePipe.transform(date, 'dd MMM Y') || ''
    console.log(this.date)
    this.getUser()
    this.getPostsOfMonth()
  }

  getUser(){
    this.authServ.getUser().subscribe((res: any) => {
      this.user = res.user
    })
  }

  getPostsOfMonth(){
    this.postServ.getPostOfMonth().subscribe((res: any) => {
      console.log(res)
      this.posts = res.posts
    })
  }

  updatePost(post: any){
    console.log(post)
  }

  deletePost(post: any){
    console.log(post)
  }

}
