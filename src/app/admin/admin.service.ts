import { Injectable } from '@angular/core';
import { Product } from './products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private baseUrl = 'http://localhost:3000';
  private userUrl = 'http://localhost:3000/registeredUsers';
  private productUrl = 'http://localhost:3000/products';


constructor(private http:HttpClient) { }

getUsersData(){
  return this.http.get(this.userUrl);

}

removeUser(userId:any){
  return this.http.delete(`${this.userUrl}/${userId}`);
}

addProduct(product: Product): Observable<any> {
  return this.http.post(this.productUrl, product);
}

}
