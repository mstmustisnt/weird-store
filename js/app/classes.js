(function(APP){
  function Store(){
    if (Store.prototype._singletonInstance) {
      return Store.prototype._singletonInstance;
    }

    Store.prototype._singletonInstance = this;

    this.init(arguments);
  }
  Store.prototype.init = function(arguments){
    this.products = _.map(arguments[0], function(item){
      return new Product(item.id, item.price, item.description, item.quantity);
    });
  };
  Store.prototype.getAvailableItems = function(item){
    return item && _.find(this.products, {id: item.id}).quantity - item.quantity;
  };

  function Cart(){
    if (Cart.prototype._singletonInstance) {
      return Cart.prototype._singletonInstance;
    }

    Cart.prototype._singletonInstance = this;


    this.init();
  }
  Cart.prototype.init  = function(){
    this.items = [];

  };
  Cart.prototype.calculatePrice = function() {
    var price = 0,
        that = this;
    if (this.items.length) {
      _.map(that.items, function(item){
        return price += item.product.price*item.quantity;
      });
      return price;
    } else {
      return 0;
    }
  };
  Cart.prototype.getTotalNumberOfItems = function(){
    var quantity = 0;
    if (this.items.length) {
      _.map(this.items, function(i){
        return quantity += i.quantity;
      });
      return quantity
    } else {
      return this.items.length;
    }
  };
  Cart.prototype.addItem = function (item) {
    this.items.push(item);
  };
  Cart.prototype.removeItem = function (item) {
    var index = this.items.indexOf(item);
    this.items.splice(index>0 ? index : 0, 1);
  };
  Cart.prototype.getItem = function(id) {
    return _.find(this.items, {id: id});
  };


  function LineItem(){
    this.init(arguments);
  }
  LineItem.prototype.init = function(arguments){
    this.id = arguments[0];
    this.quantity = 1;
    this.product = arguments[1];
  };


  function Product(id, price, description, quantity){
    this.init(arguments);
    this.price = price;
    this.description = description;
    this.quantity = quantity;
  }
  var product = new LineItem();

  Product.prototype = product;

  Product.prototype.getGrossPrice = function(){
    return this.price * this.quantity;
  };


  APP.Store = Store;
  APP.Cart = Cart;
  APP.LineItem = LineItem;
  APP.Product = Product;
}(window.APP));





