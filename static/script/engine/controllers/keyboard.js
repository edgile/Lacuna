var keyboardController = function(config){
	if(config && config.engine){
		this.engine = config.engine;
	}
	this.buttonDown = false;
	this.enabled = false;
	this.controllerType = 'relative'; // absolute (e.g. mouse) or relative (e.g. joystick)
	this.mousePosition = {x:0, y:0};
	this.downListeners = [];
	this.upListeners = [];
	var uphandler = this.upHandler.bind(this);
	var downhandler = this.downHandler.bind(this);
	if(document.addEventListener) { // Opera - Firefox - Google Chrome
		document.addEventListener("keyup", uphandler, false);
		document.addEventListener("keydown", downhandler, false);
	}
	else if(document.attachEvent) { // Internet Explorer
		document.attachEvent("onkeyup", uphandler);
		document.attachEvent("onkeydown", downhandler);
	}
	else if(!document.onkeydown && !document.onkeyup) {
		document.onkeyup = uphandler;
		document.onkeydown = downhandler;
	}
}; 

keyboardController.prototype.downHandler = function (evt) {
	var evt = evt || window.event;
	var keyCode = evt.keyCode || evt.which;
    if (keyCode == 87) { // Up W
    	this.engine.mousePosition.y = 100;
    }
    else if (keyCode == 83 || keyCode == 88) { // Down S (or X iCade support)
    	this.engine.mousePosition.y = -100;
    }
    else if (keyCode == 65) { // Left A
    	this.engine.mousePosition.x = -100;
    }
    else if (keyCode == 68) { // Right D
    	this.engine.mousePosition.y = 100;
    }
    else if (keyCode == 87 || keyCode == 74) { // Fire Space (or J iCade support)
    	this.engine.buttonDown = true;
    }
    for(var i = 0, l = this.downListeners.length; i < l; i++){
    	this.downListeners[i](keyCode);
    }
};

keyboardController.prototype.upHandler = function (evt) {
	var evt = evt || window.event;
	var keyCode = evt.keyCode || evt.which;
    if (keyCode == 87) { // Up W
    	this.engine.mousePosition.y = 0;
    }
    else if (keyCode == 83 || keyCode == 88) { // Down S (or X iCade support)
    	this.engine.mousePosition.y = 0;
    }
    else if (keyCode == 65) { // Left A
    	this.engine.mousePosition.x = 0;
    }
    else if (keyCode == 68) { // Right D
    	this.engine.mousePosition.y = 0;
    }
    else if (keyCode == 87 || keyCode == 74) { // Fire Space (or J iCade support)
    	this.engine.buttonDown = false;
    }
    for(var i = 0, l = this.upListeners.length; i < l; i++){
    	this.upListeners[i](keyCode);
    }
};