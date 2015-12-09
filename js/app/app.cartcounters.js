(function(APP){
	function init(){
		APP.mainModule.cart.update = updateCartCounters;
	}

	function updateCartCounters(item){
		var totalNumOfGoods = APP.mainModule.cart.getTotalNumberOfItems(),
			grossPrice = APP.mainModule.cart.calculatePrice(),
			itemsAvailable = item && APP.mainModule.store.getAvailableItems(item),
			numberElements = document.getElementsByClassName('total-number'),
			availableElements = item && document.getElementsByClassName('quantity-'+item.id)[0],
			priceElements = document.getElementsByClassName('total-price');
		_.map(numberElements, function(i){
		  return i.innerHTML = totalNumOfGoods;
		});
		_.map(priceElements, function(i){
		  return i.innerHTML = grossPrice;
		});
		if (availableElements){
		  availableElements.innerHTML = itemsAvailable;
		}
	}

	APP.cartCountersModule = {
		init: init
	}
}(window.APP));