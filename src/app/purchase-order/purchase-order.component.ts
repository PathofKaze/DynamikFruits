import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {LineItem, Order} from '../model';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  @Input()
	order!: Order

	@Output()
	onNewOrder = new Subject<Order>()

	_order!: Order
	orderForm!: FormGroup
	lineItemsArray!: FormArray
	total = 0.00
	counter = 0
	unitprice = 0.00
	/*priceArray = {
		"apple" : 1.49,
		"banana" : 2.39,
	}
	*/
	
	constructor(private fb: FormBuilder) { }

	ngOnInit(): void { 
		this.orderForm = this.createOrder(this.order)
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.info('>>>> changes: ', changes)
		console.info('>>>> orderForm.dirty: ', this.orderForm?.dirty)
		if (this.orderForm?.dirty && !confirm(`You have not saved your current edit. Discard?`)) {
			this.order = this._order
			return
		}

		this.orderForm = this.createOrder(this.order)
		this.total = 0
		this.checktotal()
		this._order = this.order
    	console.info('>>>> lineItemArray', this.lineItemsArray)
	}


	checktotal() {
		this.total = 0
		let priceform = this.lineItemsArray.value
		for (let i = 0; i <=priceform.length; i++) {
		let priceobject = priceform[i]
		for (const [key , value] of Object.entries(priceobject)) {
			if (`${value}` == "apple") {
				this.unitprice = 1.49
				this.total += (this.unitprice*priceobject["quantity"])
				console.info("Tentative total",this.total)
			}
			else if (`${value}` == "banana") {
				this.unitprice = 2.39
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "durian") {
				this.unitprice = 7.99
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "kiwi") {
				this.unitprice = 3.99
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "mango") {
				this.unitprice = 4.29
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "lemon") {
				this.unitprice = 1.99
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "plum") {
				this.unitprice = 0.99
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "peach") {
				this.unitprice = 5.99
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "orange") {
				this.unitprice = 1.49
				this.total += (this.unitprice*priceobject["quantity"])
			}
			else if (`${value}` == "grape") {
				this.unitprice = 0.49
				this.total += (this.unitprice*priceobject["quantity"])
			}
		}
	}
	}

	startItem() {
		this.total = 0
		this.lineItemsArray.push(this.createLineItem())
	}

	addItem() {
		this.lineItemsArray.push(this.createLineItem())
		}
	

	removeItem(idx: number) {
		this.lineItemsArray.removeAt(idx)
	}


	processOrder() {
		const order: Order = this.orderForm.value as Order
		if (!!this.order?.orderId) {
			order.orderId = this.order.orderId
			// @ts-ignore
			this.order = null
			this._order = this.order
		}
		this.orderForm = this.createOrder()
		this.onNewOrder.next(order)
	}

	private createOrder(order?: Order): FormGroup {
		this.lineItemsArray = this.createLineItems(order?.lineItems || [])
		return this.fb.group({
			name: this.fb.control<string>(order?.name || '' ,[ Validators.required, Validators.minLength(3) ]),
			mobile: this.fb.control<string>(order?.mobile || '',[ Validators.required, Validators.minLength(8) ]),
			lineItems: this.lineItemsArray,
		})
	}

	private createLineItems(lis: LineItem[] = []): FormArray {
		return this.fb.array(lis.map(li => this.createLineItem(li)))
	}
	private createLineItem(li?: LineItem): FormGroup {
		return this.fb.group({
			// @ts-ignore
			item: this.fb.control<string>(li?.item || '',[ Validators.required, Validators.minLength(3) ]),
			quantity: this.fb.control<number>(li?.quantity || 1,[ Validators.required, Validators.min(1) ]),
		})
	}


}