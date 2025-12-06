import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'app/core/service/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  users: any[] = []
  formBuilder: FormBuilder;
  searchForm: FormGroup;
  isSubmit: boolean = false;
  loading: boolean = false
  page: number = 1
  totalPages: number = 1

  constructor(private authServ: AuthenticationService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      'name': [''],
    });
  }

  ngOnInit(){
    this.getUsers(this.page)
  }

  getUsers(page: number){
    const name = this.searchForm.value.name
    console.log(name)
    if(page == 0 || page > this.totalPages){ return }
    this.loading = true;
    this.authServ.getUsers(page, name).subscribe((res: any) => {
      this.loading = false;
      this.totalPages = res.pagination.total || 1
      this.users = res.users
      console.log(this.users)
    }, error => {
      console.log(error)
      this.loading = false;
    })
  }

  deleteUser(id: number){
    this.loading = true;
    this.authServ.deleteUser(id).subscribe((res: any) => {
      this.loading = false;
      this.getUsers(this.page)
    }, error => {
      console.log(error)
      this.loading = false;
    })
  }

}
