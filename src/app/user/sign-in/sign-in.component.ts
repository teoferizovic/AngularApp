import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
//import {User} from '../../shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
  }

  public login(form: NgForm) {

    this.userService.login(form.value)
    .subscribe(data => {
      //console.log(data)
      console.log(data)
      localStorage.setItem('userToken',data.api_token);
      localStorage.setItem('userId',data.id.toString());
      this.router.navigate(['/categories']);
    },(err) => {
      //console.log(err)
      this.toastr.warning(err, 'User Login');
    })

  }
}
