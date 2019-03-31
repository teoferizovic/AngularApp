import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import {Order} from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders : Order[];
  public numberOfOrders : number;
  private userID:string;

  constructor(private orderService: OrderService) {
    this.userID = localStorage.getItem('userId');
   }

  ngOnInit() {
    this.read();
  }

  public read(){

    this.orderService.getOrders(this.userID)
      .subscribe(res => {
        this.orders = res["data"];
        this.numberOfOrders = this.orders.length;
      }, err => {
        console.log(err);
      });

  }

  public addOrder(){

    this.orderService.addOrder(this.userID)
    .subscribe(data => {
      this.read();
      //this.categoryService.getEmployeeList();
      //form.reset();
      //this.toastr.success('New Record Added Succcessfully', 'Category Register');
    })

  }


}
