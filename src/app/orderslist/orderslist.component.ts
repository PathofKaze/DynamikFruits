import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB } from '../model';

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.css']
})
export class OrderslistComponent implements OnInit {
  @Input()
	ordersDB!: OrderDB

	@Output()
	onEdit = new Subject<string>()

	constructor() { }

	ngOnInit(): void {console.info(">>> OrdersDB",this.ordersDB) }

	edit(key: string) {
		this.onEdit.next(key)
  }

}