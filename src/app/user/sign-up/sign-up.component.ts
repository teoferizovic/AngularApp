import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private roles : Role[];
  public selectedFile: File;

  constructor(private userService: UserService,private roleService: RoleService,private toastr: ToastrService) { }

  ngOnInit() {
    this.readRoles()
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  public onSubmit(form: NgForm) {

    this.userService.addUser(form.value,this.selectedFile)
    .subscribe(data => {
      form.reset();
      this.toastr.success('New User Added Succcessfully', 'User Register');
    },(err) => {
      //console.log(err)
      this.toastr.warning(err, 'User Register');
    })

  }

  public readRoles(){

    this.roleService.getRoles()
      .subscribe(res => {
        this.roles = res["data"];
      }, err => {
        console.log(err);
      });

  }

}
