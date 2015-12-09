(function(APP){
  function init(){
	for (var prop in APP) {
	  APP[prop] && APP[prop].init && APP[prop].init();
	}
  }
  APP.init = init;
}(window.APP = window.APP || {}));
