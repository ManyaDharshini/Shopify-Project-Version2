import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders:any;
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getOrders().subscribe(data =>{
    this.orders = data;
    })
  }

}
