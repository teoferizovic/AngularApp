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

  public pages : Array<number>;

  ngOnInit() {
    this.read(1);
  }

  public read(pageNum : number){
    this.productService.getProducts(pageNum)
      .subscribe(res => {
        this.products = res["data"];
        this.pages = new Array(res["last_page"]);
        console.log(res["total"]);
      }, err => {
        console.log(err);
      });
  }

}
