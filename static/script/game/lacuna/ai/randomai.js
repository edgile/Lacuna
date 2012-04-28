function randomAi(config){
	helpers.apply(config, this);
	this.timeLastShot = (new Date().getTime()) - this.timeBetweenShots;
};

randomAi.prototype.timeBetweenShots = 7000;
randomAi.prototype.timeLastShot = null;
randomAi.prototype.timeToReleaseButton = null;
randomAi.prototype.mousePosition = new THREE.Vector2(0, 0);

randomAi.prototype.update = function(timeLapse){
	var now = new Date().getTime();
	if((now -  this.timeLastShot) > this.timeBetweenShots){
		this.timeLastShot = now;
		this.mousePosition = new THREE.Vector2( 
				Math.ceil(Math.random() * this.engine.width) , 
				Math.ceil(Math.random() * this.engine.height));
		this.timeToReleaseButton = now + Math.ceil((Math.random() * 2000) + 500);
	}
	this.engine.mousePosition = this.mousePosition;
	this.engine.buttonDown = ( this.timeToReleaseButton > now );

};