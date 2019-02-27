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

  ngOnInit() {
    this.read();
  }

  public read(){
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
        console.log(this.products);
      }, err => {
        console.log(err);
      });
  }


}
