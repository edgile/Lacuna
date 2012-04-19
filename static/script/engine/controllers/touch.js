var touchController = function(config){
	if(config && config.engine){
		this.engine = config.engine;
	}
	this.resize();
	this.leftTouchID = -1;
	this.rightTouchID = -1;
	this.secondRightTouchID = -1;
	this.leftTouchPos = {x: 0, y: 0};
	this.leftTouchStartPos = {x: 0, y: 0};
	this.leftVector = {x: 0, y: 0};
	this.touchable = 'createTouch' in document; // is this running in a touch capable environment?
	this.touches = []; // array of touch vectors
	if(this.touchable) {
		window.addEventListener( 'touchstart', this.onTouchStart.bind(this), false );
		window.addEventListener( 'touchmove', this.onTouchMove.bind(this), false );
		window.addEventListener( 'touchend', this.onTouchEnd.bind(this), false );  
	}
}; 

touchController.prototype.resize = function (e) {  
	this.halfWidth = window.innerWidth / 2; 
	this.halfHeight = window.innerHeight / 2;
};

touchController.prototype.render = function(c) { // c is the canvas' context 2D
	if(this.touchable) {
		var circleColor = 'rgba(255,255,255,0.3)';
		for(var i = 0, l = this.touches.length; i < l; i++){
			var touch = this.touches[i];
			var circleColor = 'rgba(255,255,255,0.3)';
			if(touch.identifier === this.leftTouchID){
				this.drawCircle(c, circleColor, 6, this.leftTouchStartPos, 40);
				this.drawCircle(c, circleColor, 2, this.leftTouchStartPos, 60);
				this.drawCircle(c, circleColor, 2, this.leftTouchPos, 40); 
			} 
			else {
				this.drawCircle(c, circleColor, 6, {x: touch.clientX, y: touch.clientY}, 50);
			}
		}
	}
};

touchController.prototype.drawCircle = function(c, color, lineWidth, center, radius) { // c is the canvas' context 2D
	c.beginPath(); 
	c.strokeStyle = color; 
	c.lineWidth = lineWidth; 
	c.arc(center.x, center.y, radius, 0, Math.PI * 2, true); 
	c.stroke();
};

touchController.prototype.onTouchStart = function(e) {
	for(var i = 0, l = e.changedTouches.length; i < l; i++){
		var touch = e.changedTouches[i]; 
		if((this.leftTouchID < 0) && (touch.clientX < this.halfWidth)) {
			this.leftTouchID = touch.identifier; 
			this.leftTouchStartPos = {x: touch.clientX, y: touch.clientY}; 	
			this.leftTouchPos = {x: touch.clientX, y: touch.clientY}; 
			this.leftVector = {x: 0, y: 0};	
		} 
		else if(this.rightTouchID < 0){	
			// Button down event
			this.rightTouchID = touch.identifier;
			this.engine.buttonDown = true;
		}
		else if(this.secondRightTouchID < 0){	
			// Button down event
			this.secondRightTouchID = touch.identifier;
			this.engine.rightButtonDown = true;
		}	
	}
	this.touches = e.touches; 
};
	
touchController.prototype.onTouchMove = function(e) {
	e.preventDefault(); // Prevent the browser from doing its default thing (scroll, zoom)
	for(var i = 0, l = e.changedTouches.length; i < l; i++){
		var touch = e.changedTouches[i]; 
		if(this.leftTouchID === touch.identifier){
			this.leftTouchPos = {x: touch.clientX, y: touch.clientY}; 
			this.leftVector = {x: touch.clientX - this.leftTouchStartPos.x, y: touch.clientY - this.leftTouchStartPos.y};
			this.engine.mousePosition = {
				x: Math.floor(this.leftVector.x / 5),
				y: Math.floor(this.leftVector.y / 5)
			};
			this.engine.absoluteController = false;
			break; 		
		}		
	}
	this.touches = e.touches; 
};

touchController.prototype.onTouchEnd = function(e) { 
	this.touches = e.touches;
	for(var i = 0, l = e.changedTouches.length; i < l; i++){
		var touch = e.changedTouches[i];
		if(this.leftTouchID === touch.identifier){
			this.leftTouchID = -1; 
			this.leftVector = {x: 0, y: 0};
			this.engine.mousePosition = this.leftVector;
			this.engine.absoluteController = false; 		
		}
		else if(this.rightTouchID === touch.identifier){
			this.rightTouchID = -1;
			this.engine.buttonDown = false;
		}
		else if(this.secondRightTouchID === touch.identifier){
			this.secondRightTouchID = -1;
			this.engine.rightButtonDown = false;
		}
	}
};




