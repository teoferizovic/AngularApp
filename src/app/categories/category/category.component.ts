import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import {Category} from'../shared/category.model'
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,private toastr: ToastrService) { }

  ngOnInit() {
  }


  public onSubmit(form: NgForm) {

    this.categoryService.addCategory(form.value)
    .subscribe(data => {
      //this.categoryService.getEmployeeList();
      form.reset();
      this.toastr.success('New Record Added Succcessfully', 'Category Register');
    })

  }

}
