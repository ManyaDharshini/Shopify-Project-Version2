import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from './login/authUser.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000';
  private url = 'http://localhost:3000/cart';
  private orderUrl = 'http://localhost:3000/orders';
  cartCount:number;
  subtotal:number;
  cartTotal:number;
  constructor(private http: HttpClient, private authUser:AuthUserService) { }

  getCartItems(): Observable<any> {
    const currentUserId =this.authUser.setUserId();
    // console.log("cart user id"+currentUserId);
    const apiUrl = `${this.baseUrl}/cart?userId=${currentUserId}`;
    return this.http.get<any>(apiUrl);
  }

  addCartItem(item: any): Observable<any> {
    return this.http.post<any>(this.url,item);
  }

  updateCartItem(item: any): Observable<any> {
    const updateUrl = `${this.url}/${item.id}`;
    return this.http.put<any>(updateUrl, item);
  }

  getSubtotal(total: number){
    this.subtotal = total;
  }

  getcartTotal(total: number){
   this.cartTotal = total;
  }

  deleteCartItem(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }
  clearCart(id: number): Observable<any>  {
    const currentUserId =this.authUser.setUserId();
    // console.log("cart user id"+currentUserId);
    const apiUrl = `${this.baseUrl}/cart?userId=${currentUserId}/${id}`;
    console.log("cart cleared");
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  placeOrder(orders): Observable<any> {
    return this.http.post<any>(this.orderUrl,orders);
  }

  getOrders(): Observable<any>{
    const currentUserId =this.authUser.setUserId();
    const apiUrl = `${this.baseUrl}/orders?userId=${currentUserId}`;
    return this.http.get<any>(apiUrl);

  }
  // getCartCount(count:number){
  //    this.cartCount=count;
  //    //console.log(this.cartCount);
  // }
  

}
