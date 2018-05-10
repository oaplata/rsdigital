import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../app.component';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {

  public orders: Array<Order>
  public languaje = window.localStorage.getItem('languaje') || 'Ingles'
  public user: any
  constructor(
    private orderService: OrderService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('session'))
    this.orderService.getOrders()
      .valueChanges().subscribe((orders: Array<Order>) => {
        this.orders = orders.filter(o => (this.user.rol === 'mesero') ? true : o.user === this.user.email)
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { languaje: this.languaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.languaje = result || this.languaje
      window.localStorage.setItem('languaje', this.languaje)
    })
  }

}