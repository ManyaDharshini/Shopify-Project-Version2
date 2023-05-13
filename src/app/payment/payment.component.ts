import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private route:Router,private cartService:CartService) { }
  cartItems: any[] = [];
  ngOnInit() {
  }
  checkout(){
    alert("your order has been placed successfully!!");
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.cartItems.forEach((item: any) => {
        this.cartService.clearCart(item.id).subscribe(()=>{
          this.cartItems = [];
        });
      })

    });
    this.route.navigateByUrl('/home');
  }

   
 
  
}
