import { Injectable } from '@angular/core';
import { Product } from './products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  offerStatus: boolean = false;

  private baseUrl = 'http://localhost:3000';
  private userUrl = 'http://localhost:3000/registeredUsers';
  private productUrl = 'http://localhost:3000/products';
  private orderUrl = 'http://localhost:3000/orders';


constructor(private http:HttpClient) { 

}

startOffer(){
      this.offerStatus = true;
      localStorage.setItem('offerStatus','true');
}

endOffer(){
  this.offerStatus = false;
  localStorage.setItem('offerStatus','false');

}

getOfferStatus(): boolean {
  return this.offerStatus;
}



getUsersData(){
  return this.http.get(this.userUrl);

}

removeUser(userId:any){
  return this.http.delete(`${this.userUrl}/${userId}`);
}

getProducts(): Observable<any[]>{
  return this.http.get<any[]>(this.productUrl);
}

getProduct(productId:any): Observable<any>{
  return this.http.get(`${this.productUrl}/${productId}`)
}

updateProduct(product:any): Observable<any>{
  return this.http.put(`${this.productUrl}/${product.id}`, product)
}

updateOffer(product: any): Observable<any> {
  return this.http.patch(`${this.productUrl}/${product.id}`, product);
}

updateInitialProducts(products):Observable<any>{
  return this.http.put(this.productUrl,products);
}

addProduct(product: Product): Observable<any> {
  return this.http.post(this.productUrl, product);
}

removeProduct(productId:any){
  return this.http.delete(`${this.productUrl}/${productId}`);
}

getOrders(): Observable<any>{
  return this.http.get(this.orderUrl);
}

}
