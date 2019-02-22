import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {

    this.userService.addUser(form.value)
    .subscribe(data => {
      form.reset();
      this.toastr.success('New User Added Succcessfully', 'User Register');
    },(err) => {
      //console.log(err)
      this.toastr.warning(err, 'User Register');
    })

  }

}
