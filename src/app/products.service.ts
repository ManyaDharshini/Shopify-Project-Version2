import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from './products/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='http://localhost:3000/products'
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get(this.apiUrl);
  }

}
