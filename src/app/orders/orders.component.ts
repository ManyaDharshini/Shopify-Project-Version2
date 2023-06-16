import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
   orders: any[] = [];
   isCheckout = false;
   ordersLength: number = 0;
  constructor(private cartService: CartService) {
    this.isCheckout = localStorage.getItem('isCheckout') ==='true';
   }

  ngOnInit() {
    this.getOrders();
   
  }

  getOrders(): void{
    this.cartService.getOrders().subscribe(orders=>{
      this.orders = orders
      this.ordersLength = this.orders.length;
      console.log("orders"+this.orders);
     });
  }

  convertToNumber(value: string):number{
    const number = value.replaceAll(',','');
    return Number(number);
  }

}
