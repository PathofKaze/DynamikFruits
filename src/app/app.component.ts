import { Component, OnInit } from '@angular/core';
import {v4} from 'uuid'

import { Order,OrderDB } from './model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamikfruits';

  ordersDB: OrderDB = {}
	order!: Order

	ngOnInit(): void {
	}

	processNewOrder(newOrder: Order) {
		let orderId = !newOrder.orderId? v4().substring(0, 8): newOrder.orderId
		newOrder.orderId = orderId
		this.ordersDB = { ...this.ordersDB, [orderId]: newOrder }
	}

	editOrder(key: string) {
		this.order = this.ordersDB[key]
	}
}

