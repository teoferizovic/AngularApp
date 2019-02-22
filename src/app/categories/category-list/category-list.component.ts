import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../shared/category.service';
import {Category} from'../shared/category.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {CrudOptions} from'../shared/crud-options';
import { ActivatedRoute,ParamMap } from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, CrudOptions {

  categories$ : Object;
  private  contacts:  Array<object> = [];
  private selectedId;
  private data: Category[] = [];
  private isLoadingResults = true;

  @Input('parentData') public lastName;
  @Output() public childEvent = new EventEmitter();

  constructor(private route: ActivatedRoute,private categoryService: CategoryService,private toastr?: ToastrService) {}

  ngOnInit() {
    this.read();
    this.getSelectedId();
  }

  public read(){
    this.categoryService.getCats()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  public delete(id) {
    this.isLoadingResults = true;
    this.categoryService.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.read();
          this.toastr.warning("Deleted Successfully","Category");
          //this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  public create(form: NgForm) {

    this.categoryService.addCategory(form.value)
    .subscribe(data => {
      //this.categoryService.getEmployeeList();
      this.read()
      form.reset();
      this.toastr.success('New Record Added Succcessfully', 'Category Register');
    },(err) => {
      console.log(err);
      this.toastr.warning(err, 'Category Register');
     }
   );

  }

  public fireEvent(){
      this.childEvent.emit("majka da ima,majka bi dala.");
  }

  public getSelectedId(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.selectedId=id;
    });
  }

  public isSelcted(category){
    return category.id === this.selectedId;
  }




}
