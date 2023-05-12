import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { Product } from './product';
import { Observable } from 'rxjs';
import { AuthUserService } from '../login/authUser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  products:any;
  filteredProducts: any;
  searchedProducts:any;
  selectedCategory: string = '';
  searchTerm: string = '';
  productNotFound=false;
  constructor(private service:ProductsService,private cartService:CartService,
    private authUser:AuthUserService,private route:Router) {
    this.service.getProducts().subscribe(data=>{
      this.products=data;
      this.filteredProducts = data;
    })
   }

   filterProducts() {
    if (this.selectedCategory === '' && this.searchTerm === '') {
      this.filteredProducts=this.products;
    } 
    else if(this.selectedCategory ===''){
      this.filteredProducts = this.products.filter(product=> product.model.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    else if (this.searchTerm === '') {
      this.filteredProducts = this.products.filter(product=> product.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }else{
      this.filteredProducts = this.products.filter(product=> product.category.toLowerCase() === this.selectedCategory.toLowerCase() && 
      product.model.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  // filterSearchProducts(){
  //   if (this.searchTerm) {
  //     this.filteredProducts = this.products.filter(product=> product.model.toLowerCase().includes(this.searchTerm.toLowerCase()));
  //   }
  //   // else if(this.filteredProducts.length==0){
  //   //   this.productNotFound=true;
  //   // }
  //   else{
  //     this.filteredProducts = this.products;
  //   }
  // }

  //  addToCart(id: number) {
  //  this.service.addToCart(id).subscribe(product => this.cartService.addItem(product));
  // }
  addToCart(product: any): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
    const cartItem = {
      productId: product.id,
      userId:this.authUser.setUserId(),
      image:product.image,
      name: product.model,
      price: product.price,
      quantity: 1,
    };
    console.log(cartItem);
    this.cartService.getCartItems().subscribe((cartItems:any)=>{
      const existingItem = cartItems.find((res:any)=>{
        return res.productId === cartItem.productId
      });
      if(!existingItem){
        this.cartService.addCartItem(cartItem).subscribe(() => {
          alert("Product added to the cart")
          console.log('Item added to cart successfully');
        });
      }else{
        alert("Product already added to the cart");
      }
    })

  }else{
    alert('Please login... ');
    this.route.navigateByUrl('/login');
  }
}

}
