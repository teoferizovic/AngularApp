import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User[];

  constructor(private userService: UserService,private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('userId')).subscribe(
      data => this.user = data
    );
  }

  public logout(){

    this.userService.logout(localStorage.getItem('userToken'))
    .subscribe(data => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
    },(err) => {
      //console.log(err)
      this.toastr.warning(err, 'User Login');
    })
  }

}
