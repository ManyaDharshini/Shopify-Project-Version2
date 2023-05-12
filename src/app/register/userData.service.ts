import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn:'root'
})
export class UserDataService {
private apiUrl='http://localhost:3000/registeredUsers';
constructor(private client:HttpClient) { }
addRegisterData(data:any){
return this.client.post(this.apiUrl,data);
}
getRegisterData(){
  return this.client.get(this.apiUrl);
}
updatePassword(id:number, data:any) {
  const url = `${this.apiUrl}/${id}`;
  // console.log(url);
  return this.client.patch(url, data);
}
}
