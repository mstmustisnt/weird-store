(function(APP){
  var template = document.getElementById('productstpl').innerHTML,
	  productDBParsed = JSON.parse(document.getElementById('products-db').innerHTML).products,
	  renderData = JSON.parse(document.getElementById('products-db').innerHTML),
	  productIds = _.pluck(productDBParsed, 'id'),
	  cart = new APP.Cart(),
	  store = new APP.Store(productDBParsed);


	/**
	 * An Observer Pattern implementation
	 *
	 *  **/
  function extend( obj, extension ){
	for ( var key in extension ){
		obj[key] = extension[key];
	}
 }

  extend(store,  new APP.Subject());
  extend(cart,  new APP.Observer());

  store.addObserver(cart);



  function findInStore(id){
	return _.find(store.products, {id: parseInt(id.split('-').pop())});
  }

  /**
   * handle click events on add and remove buttons
   * @param: @action - string, acceptable values are 'add' or 'remove'
   *
   * **/
  function handleClickEvent(action) {
	_.map(productIds, function(item){
	  document.getElementById(action+'-'+item).addEventListener('click', function (e) {
		var productInDB = findInStore(e.target.id),
			basketElement = {
			  elem: document.getElementById('basket-elem-'+productInDB.id),
			  quantity: document.querySelector('#basket-elem-'+productInDB.id+' .item-quantity')
			},
			foundInCart = productInDB && cart.getItem(productInDB.id),
			currentLineItem;
		switch (action) {
		  case 'add':
			if (foundInCart && foundInCart.quantity <= productInDB.quantity) {
			  if (foundInCart && foundInCart.quantity === productInDB.quantity) {
				this.setAttribute('class', 'disabled');
				document.getElementById('remove-'+productInDB.id).setAttribute('class', 'enabled');
			  } else {
				basketElement.quantity.innerHTML = parseInt(basketElement.quantity && basketElement.quantity.innerHTML)+1;
				foundInCart.quantity += 1;
			  }
			} else if (productInDB && !foundInCart) {
			  currentLineItem = new APP.LineItem(productInDB.id, productInDB);
			  cart.addItem(currentLineItem);
			  APP.events.emit('productsManaged', productInDB.id);
			} else {
			  console.log('this state is impossible, we guess');
			}
			store.notify(foundInCart || currentLineItem);
			break;
		  case 'remove':
			if (foundInCart && foundInCart.quantity) {
			  basketElement.quantity.innerHTML = parseInt(basketElement.quantity && basketElement.quantity.innerHTML)-1;
			  foundInCart.quantity -= 1;
			  if (foundInCart && !foundInCart.quantity) {
				cart.removeItem(foundInCart);
				basketElement.elem && basketElement.elem.remove();
				this.setAttribute('class', 'disabled');
				document.getElementById('add-' + productInDB.id).setAttribute('class', 'enabled');
			  }
			}else {
			  basketElement.elem && basketElement.elem.remove();
			  console.log('Item with id ' + productInDB.id  +' is completely removed from cart');
			}
			  store.notify(foundInCart || currentLineItem);
			break;
		  default:
			console.log('You should pass valid parameter');
		}
		APP.events.emit('basketUpdated');
	  });
	});
  }

  function init(){
	  document.getElementById('products-wrapper').innerHTML = Mustache.to_html(template, renderData);
	  handleClickEvent('add');
	  handleClickEvent('remove');
  }

  APP.mainModule = {
	  cart: cart,
	  store: store,
	  init: init
  };
}(window.APP));