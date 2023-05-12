import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../register/userData.service';
import { AuthUserService } from './authUser.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginBox=true;
  invalidUser=false;
  openPopup=false;
  openResetPswd=false;
  constructor(private route:Router,private userData:UserDataService,private authUser:AuthUserService,private cartService:CartService) { }
  loginForm=new FormGroup({
    emailId:new FormControl('',[Validators.required,Validators.pattern("^([a-zA-Z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  ngOnInit() {
  }
  submitLogin(){
    //  console.log(this.loginForm.value);

     this.userData.getRegisterData().subscribe((users:any)=>{
      const user = users.find((res:any)=>{
        return res.emailId === this.loginForm.value.emailId && res.password === this.loginForm.value.password
      });
    if(this.loginForm.value.emailId===""|| this.loginForm.value.password==="" ){
      this.loginForm.markAllAsTouched();
     }
     else if(user){
      this.invalidUser=false;
      this.openPopup=true;
      const userId=user.id;
      //console.log("Currennt User id : "+userId);
      this.authUser.getUserId(userId);
     }else if(!user){
         this.invalidUser=true;
     }
    });

  }
  goToHome(){
    this.route.navigateByUrl('/home');
    this.authUser.onLogin();
  }

}


