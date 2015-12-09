(function(APP){
  var addScrollBar;
	// add events listeners
	function init(){
		APP.events.on('productsManaged', updateBasket);
		APP.events.on('basketUpdated',  displayBasket);
		APP.events.on('basketUpdated', addScrollBasket);
	}


 function updateBasket(id){
   var title = document.querySelector('#item-'+id+' .item-title a').innerHTML,
		titleHolder = document.createElement('h3'),
		image = document.querySelector('#item-'+id+' img').getAttribute('src'),
		imgHolder = document.createElement('figure'),
		numberHolder = document.createElement('div'),
		newBasketElement = document.createElement('a'),
		basket = document.getElementById('basket'),
		children = [
		  {
			element: imgHolder,
			value: '<img src='+image+' alt='+title+'/>'
		  },
		  {
			element: titleHolder,
			value: title,
			attr: {
			  type: 'class',
			  value: 'item-title'
			}
		  },
		  {
			element: numberHolder,
			value: 1,
			attr: {
			  type: 'class',
			  value: 'item-quantity'
			}
		  }
		];
	newBasketElement.setAttribute('id', 'basket-elem-'+id);
	newBasketElement.setAttribute('href', '#item-'+id);
	_.map(children, function(i){
	  if (i.value){
		i.element.innerHTML = i.value;
	  }
	  if (i.attr){
		i.element.setAttribute(i.attr.type, i.attr.value);
	  }
	  return newBasketElement.appendChild(i.element)
	});
	document.querySelectorAll('#basket .basket-item-title').innerHTML = title;
	basket.appendChild(newBasketElement);
  }

 function displayBasket() {
   if (document.querySelector('#basket > a')) {
	 document.querySelector('#basket').setAttribute('class', 'clearfix');
   } else {
	 document.querySelector('#basket').setAttribute('class', 'hidden');
   }
 }

 function addScrollBasket(){
	if (document.createEvent) {
	 addScrollBar = document.createEvent('HTMLEvents');
	 addScrollBar.initEvent('overflow', true, true);
	} else {
	 addScrollBar = document.createEventObject();
	 addScrollBar.eventType = 'overflow';
	}
	addScrollBar.eventName = 'overflow';
	document.getElementById('basket').addEventListener('overflow', function(){
	 this.style.overflowY = 'scroll';
	 this.style.overflowX = 'hidden';
	});

	var basket = document.getElementById('basket'),
		basketWidth = basket.offsetWidth,
		children = document.querySelectorAll('#basket>a'),
		childrenWidth = 0;

	_.map(children, function(i){
	  return childrenWidth += i.offsetWidth + parseInt(i.currentStyle || getComputedStyle(i).marginLeft)*2;
	});
	if (childrenWidth>basketWidth) {
	  document.createEvent ? basket.dispatchEvent(addScrollBar) : basket.fireEvent("on" + addScrollBar.eventType, addScrollBar);
	} else {
	  basket.style.overflowY = 'hidden';
	}
  }


	APP.basketModule = {
		init: init
	}

}(window.APP));