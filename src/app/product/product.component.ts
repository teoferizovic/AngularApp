import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import {Product} from './shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  private products : Product[];
  private productsS : Product[];
  public visible : boolean = false;
  public pages : Array<number>;
  private searchName : string;
  private btnChange : string = "Search";
  private queryParam : string;

  ngOnInit() {
    this.read(1);
  }

  public read(pageNum : number){
    this.queryParam  = "?page="+pageNum;
    this.productService.getProducts(this.queryParam)
      .subscribe(res => {
        this.products = res["data"];
        this.pages = new Array(res["last_page"]);
        console.log(res["total"]);
      }, err => {
        console.log(err);
      });
  }

  public searchByName(searchName : string){
    this.queryParam  = "?name="+searchName;
    this.productService.getProducts(this.queryParam)
      .subscribe(res => {
        this.productsS = res["data"];
      }, err => {
        console.log(err);
      })
  }

  public showSearch() : boolean {
    this.btnChange = (this.btnChange == "Search") ? "List" : "Search";
    this.searchName='';
    this.productsS = [];
    return this.visible =! this.visible;
  }

  //https://stackblitz.com/edit/angular-tabs-example?file=app%2Fapp.component.ts
  //https://ng-bootstrap.github.io/#/getting-started
}
