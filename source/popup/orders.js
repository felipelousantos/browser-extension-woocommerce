const siteURL = 'https://example.org';

const orderStatusList = {
	processing: '#5b841b',
	'on-hold': '#94660c',
	failed: '#761919',
	completed: '#2e4453',
	trash: '#761919',
	other: '#777',
};

const orders = { 
	0: {
		"id": 737,
		"parent_id": 0,
		"status": "processing",
		"currency": "USD",
		"version": "5.9.0",
		"prices_include_tax": false,
		"date_created": "2021-12-15T17:02:57",
		"date_modified": "2021-12-15T17:03:02",
		"discount_total": "0.00",
		"discount_tax": "0.00",
		"shipping_total": "10.00",
		"shipping_tax": "0.00",
		"cart_tax": "1.80",
		"total": "29.80",
		"total_tax": "1.80",
		"customer_id": 1,
		"order_key": "wc_order_oRJcl5b5snade",
		"billing": {
			"first_name": "John",
			"last_name": "Doe",
			"company": "Lorem Ipsum LLC",
			"address_1": "1335 Dallas Parkway",
			"address_2": "",
			"city": "Dallas",
			"state": "TX",
			"postcode": "75240",
			"country": "US",
			"email": "example@example.org",
			"phone": "+1 (123) 456-7890"
		},
		"shipping": {
			"first_name": "John",
			"last_name": "Doe",
			"company": "Lorem Ipsum LLC",
			"address_1": "1335 Dallas Parkway",
			"address_2": "",
			"city": "Dallas",
			"state": "TX",
			"postcode": "75240",
			"country": "US",
			"phone": ""
		},
		"payment_method": "woocommerce_payments",
		"payment_method_title": "Visa credit card",
		"transaction_id": "pi_4abcdW2HSWKItEqq0L847iIw",
		"customer_ip_address": "123.456.78.91",
		"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
		"created_via": "checkout",
		"customer_note": "",
		"date_completed": null,
		"date_paid": "2021-12-15T17:03:02",
		"cart_hash": "a70b0b31974ada75140190733320ecd9",
		"number": "737",
		"meta_data": [
			{
				"id": 20386,
				"key": "is_vat_exempt",
				"value": "no"
			},
			{
				"id": 20387,
				"key": "automatewoo_cart_id",
				"value": "18"
			},
			{
				"id": 20389,
				"key": "_payment_method_id",
				"value": "abc"
			},
			{
				"id": 20390,
				"key": "_stripe_customer_id",
				"value": "abc"
			},
			{
				"id": 20391,
				"key": "_intent_id",
				"value": "abc"
			},
			{
				"id": 20392,
				"key": "_charge_id",
				"value": "abc"
			},
			{
				"id": 20393,
				"key": "_intention_status",
				"value": "succeeded"
			},
			{
				"id": 20394,
				"key": "_wcpay_intent_currency",
				"value": "USD"
			},
			{
				"id": 20402,
				"key": "_new_order_email_sent",
				"value": "true"
			},
			{
				"id": 20403,
				"key": "_automatewoo_order_created",
				"value": "1"
			}
		],
		"line_items": [
			{
				"id": 535,
				"name": "Beanie with Logo",
				"product_id": 326,
				"variation_id": 0,
				"quantity": 1,
				"tax_class": "",
				"subtotal": "18.00",
				"subtotal_tax": "1.80",
				"total": "18.00",
				"total_tax": "1.80",
				"taxes": [
					{
						"id": 2,
						"total": "1.8",
						"subtotal": "1.8"
					}
				],
				"meta_data": [],
				"sku": "Woo-beanie-logo",
				"price": 18,
				"parent_name": null
			}
		],
		"tax_lines": [
			{
				"id": 537,
				"rate_code": "US-US-10-1",
				"rate_id": 2,
				"label": "US-10",
				"compound": false,
				"tax_total": "1.80",
				"shipping_tax_total": "0.00",
				"rate_percent": 10,
				"meta_data": []
			}
		],
		"shipping_lines": [
			{
				"id": 536,
				"method_title": "Cool flat rate",
				"method_id": "flat_rate",
				"instance_id": "6",
				"total": "10.00",
				"total_tax": "0.00",
				"taxes": [],
				"meta_data": [
					{
						"id": 4966,
						"key": "Items",
						"value": "Beanie with Logo &times; 1",
						"display_key": "Items",
						"display_value": "Beanie with Logo &times; 1"
					}
				]
			}
		],
		"fee_lines": [],
		"coupon_lines": [],
		"refunds": [],
		"date_created_gmt": "2021-12-15T16:02:57",
		"date_modified_gmt": "2021-12-15T16:03:02",
		"date_completed_gmt": null,
		"date_paid_gmt": "2021-12-15T16:03:02",
		"currency_symbol": "$",
		"_links": {
			"self": [
				{
					"href": "https://example.org/wp-json/wc/v3/orders/737"
				}
			],
			"collection": [
				{
					"href": "https://example.org/wp-json/wc/v3/orders"
				}
			],
			"customer": [
				{
					"href": "https://example.org/wp-json/wc/v3/customers/1"
				}
			]
		}
	}
 };

for (const orderKey in orders) {
	const orderParent = document.querySelector('#orders');
	const orderContent = document.createElement('div');
	const order = orders[orderKey];
	const orderURL = siteURL + '/wp-admin/post.php?post=' + 773 + '&action=edit';
	const orderPrice = order.currency_symbol + order.total + ' ' + order.currency;
	const orderCustomer = order.billing.first_name + ' ' + order.billing.last_name;
	orderContent.innerHTML = `
	<a href="` + orderURL + `" target="_blank">
		<div class="header">
			<strong class="price">` + orderPrice + `</strong>
			<small class="status">` + order.status + `</small>
		</div>
		<div class="footer">
			<div class="id">#` + order.id + ' ' + orderCustomer + `</div>
		</div>
	</a>
	`;
	orderParent.append(orderContent);
	orderContent.classList.add('order', order.status);
}

const sheet = document.createElement('style');
document.body.append(sheet);
const rootElement = document.querySelector(':root');

for (const status in orderStatusList) {
	const color = orderStatusList[status];
	const colorVariable = '--' + status + '-color';
	const colorSelector = '.order.' + status;
	rootElement.style.setProperty(colorVariable, color);
	sheet.innerHTML += colorSelector + ' {border-color: var(' + colorVariable + ');} ';
	sheet.innerHTML += colorSelector + ' .header' + ' {background-color: var(' + colorVariable + ');} ';
	sheet.innerHTML += colorSelector + ' .footer' + ' {color: var(' + colorVariable + ');} ';
}
