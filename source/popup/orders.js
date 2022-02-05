import optionsStorage from '../options/options-storage.js';

let navSettings = document.querySelector(".nav-settings");
navSettings.href = chrome.extension.getURL("/options/options.html");

function ordersContent(orders, siteURL) {

	const loader = document.getElementById('loader');
	loader.style.visibility = "hidden";

	let navOrders = document.querySelector(".nav-orders");
	navOrders.href = siteURL + '/wp-admin/edit.php?post_type=shop_order';

	const orderStatusList = {
		processing: '#5b841b',
		'on-hold': '#94660c',
		failed: '#761919',
		completed: '#2e4453',
		trash: '#761919',
		other: '#777',
	};

	function emptyFallback(value) {
		if (value) {
			return value;
		} else {
			return 'N/A';
		}
	}

	for (const orderKey in orders) {
		const wrapper = document.querySelector('#orders');
		const orderContent = document.createElement('div');
		const order = orders[orderKey];
		const orderURL = siteURL + '/wp-admin/post.php?post=' + order.id + '&action=edit';
		const orderDate = new Date(order.date_modified_gmt);
		const orderPrice = order.currency_symbol + order.total + ' ' + order.currency;
		const orderCustomer = order.billing.first_name + ' ' + order.billing.last_name;
		const orderBilling = order.billing.first_name + ' ' + order.billing.last_name + ' (' + emptyFallback(order.billing.company) + '), ' + order.billing.address_1 + ', ' + emptyFallback(order.billing.address_2) + ', ' + order.billing.city + ', ' + order.billing.state + ', ' + order.billing.country + ', ' + order.billing.postcode + '.';
		const orderShipping = order.shipping.first_name + ' ' + order.shipping.last_name + ' (' + emptyFallback(order.shipping.company) + '), ' + order.shipping.address_1 + ', ' + emptyFallback(order.shipping.address_2) + ', ' + order.shipping.city + ', ' + order.shipping.state + ', ' + order.shipping.country + ', ' + order.shipping.postcode + '.';
		orderContent.innerHTML += `
			<div class="header">
				<strong class="price">` + orderPrice + `</strong>
				<small class="status">` + order.status + `</small>
			</div>
			<div class="footer">
			<details>
				<summary class="id">#` + order.id + ' ' + orderCustomer + `</summary>
				<p class="date">` + orderDate.toString() + `</p>
				<hr>
				<p><span class="section">Billing Address:</span> ` + orderBilling + `</p>
				<hr>
				<p><span class="section">Shipping Address:</span> ` + orderShipping + `</p>
				<a class="button" href="` + orderURL + `" target="_blank">View order</a>
			</details>
			</div>
		`;
		wrapper.append(orderContent);
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
		sheet.innerHTML += colorSelector + ' .footer .button' + ' {background-color: var(' + colorVariable + ');} ';
	}
}

function ordersLoad(siteURL, consumer_key, consumer_secret) {

	var myHeaders = new Headers();
	myHeaders.append("Cookie", "wpe-auth=e1b325c2f00368b397a458355e33630b9a5a6a37b1f96e7cfc0353f11bd76670");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	};

	fetch(siteURL + "/wp-json/wc/v3/orders?per_page=5&context=view&context=view&consumer_key=" + consumer_key + "&consumer_secret=" + consumer_secret, requestOptions)
		.then(response => response.json())
		.then(orders => {
			ordersContent(orders, siteURL);
		}).catch(function (error) {
			console.log(error);
		});
}

async function init() {
	const options = await optionsStorage.getAll();
	ordersLoad(options.url, options.consumerKey, options.consumerSecret);
}

init();