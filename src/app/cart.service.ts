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
  cartCount:number;
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

  deleteCartItem(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  // getCartCount(count:number){
  //    this.cartCount=count;
  //    //console.log(this.cartCount);
  // }
  

}
