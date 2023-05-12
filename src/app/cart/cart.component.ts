import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../products/product';
import { AuthUserService } from '../login/authUser.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  totalPrice:number = 0;
  cartCount:number = 0;
  constructor(private cartService: CartService, public authUser: AuthUserService) {
    setInterval(()=>{
          this.getCartTotal();

    },1000);
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

  }

  removeFromCart(item: any): void {
    this.cartService.deleteCartItem(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    });
  }

  increaseQuantity(item: any): void {

    if(item.quantity <3 ){
    item.quantity++;
    this.cartService.updateCartItem(item).subscribe(() => {
    });
  }
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item).subscribe(() => {
      });
    }
  }

  getSubTotal(item:any){
     const price = item.price;
     const priceNumber = parseFloat(price.replaceAll(',', ''));
     const quantity= item.quantity;
     const quantityNumber = parseInt(quantity);
     return priceNumber * quantityNumber;
  }

  getCartTotal(){
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartItems.reduce((acc,item)=> acc + parseFloat(item.price.replaceAll(',','')) * parseInt(item.quantity),0);
      //console.log(this.totalPrice);
    });
  }


}
