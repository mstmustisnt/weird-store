(function(APP){
  function Subject(){
	this.observers = [];
  }

  Subject.prototype.addObserver = function( observer ){
	this.observers.push(observer);
  };

  Subject.prototype.removeObserver = function( observer ){
	this.observers.splice(this.observers.indexOf( observer), 1);
  };

  Subject.prototype.notify = function( context ){

	_.map(this.observers, function(observer){
	  observer.update(context)
	})

  };


  function Observer(){
	this.update = function(){
	  //...
	};
  }
  APP.Subject = Subject;
  APP.Observer = Observer;
}(window.APP));