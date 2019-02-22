import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from '../shared/category.service';
import {Category} from'../shared/category.model';
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent implements OnInit {

  category$: Category[];
  id: number;
  name$ : string  = "teo";
  public isTrue : boolean = true;

  public colors :string[] =["red","blue","white"];

  public age = "22";

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router) {
       this.route.params.subscribe( params => {
          this.category$ = params.id,
          this.id = params.id
        });
    }

  ngOnInit() {
    this.categoryService.getCategory(this.category$).subscribe(
      data => this.category$ = data
    );
  }

  public mySub(){
    console.log("taj sam "+this.name$+" i imam "+this.age+" godina.");
  }

  public update(form: NgForm) {

    this.categoryService.updateCategory(this.id, form.value)
      .subscribe(res => {
          this.router.navigate(['/categories']);
          this.toastr.success('Record Edited Succcessfully', 'Category Register');
        }, (err) => {
          //console.log(err)
          this.toastr.warning(err, 'Category Register');
        }
      );

  }

  public goBack(){
    let selectedId = this.id ? this.id : null;
    //this.router.navigate(['/categories',{id:selectedId}]);
    this.router.navigate(['../',{id:selectedId}],{relativeTo:this.route});
  }

}
