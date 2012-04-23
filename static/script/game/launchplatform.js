/*
 *   LaunchPlatform
 */
if(typeof(require) !== 'undefined'){
	var helpers = require("./helpers").helpers;
	var entity = require("./entity").entity;
}
	
var LaunchPlatform = function(config){
	helpers.apply(config, this);
	// Game logic fields
	this.type = 'launchplatform';
	this.position = this.position || {x:this.engine.width / 2, y: 50};
	this.angle = this.angle || 0;
    this.maxForce = 10000;
    this.timeToReachMaxForce = 1500;
    this.influencedByGravity = false;
    this.pointerLocation = null;
    this.launchForceTimer = null;
    this.forceVector = null;
    // Visible elements fields 
    this.modelIndex = 1;
	this.aimLine = {type: 'line', width: 3, color: 'gray', start: {x: 0, y: 39}, end: {x: 0, y: 48}};
	this.forceLine = {type: 'line', width: 3, color: 'green', start: {x: 0, y: 0}, end: {x: 0, y: 0}};
	this.shapes = [
	    {type: 'line', width: 2, color: 'red', start: {x: 0, y: 5}, end: {x: 0, y: -5}},
	    {type: 'line', width: 2, color: 'red', start: {x: 5, y: 0}, end: {x: -5, y: 0}},
	    {type: 'circle', width: 1, color: 'gray', center: {x: 0, y: 0}, radius: 40},
	    this.aimLine,
	    this.forceLine
	];
};

LaunchPlatform.prototype = new entity();

LaunchPlatform.prototype.update = function(time){
	if(this.engine.mode !== 'client'){   
		// Start or stop the launchForceTimer depending on the button state
		this.engine.buttonDown ? this.start() : this.stop();
		// Update the aim line
		this.aimLine.start = this.getCurrentForceDirection().setLength(39);
		this.aimLine.end = this.getCurrentForceDirection().setLength(48);
		// Update the force line
	    if (this.launchForceTimer && this.launchForceTimer.running) {	    	
	        this.forceLine.end = this.getCurrentForceDirection().setLength(48 * this.getCurrentForceVector().length() / this.maxForce);
	    }
	    else{
	    	this.forceLine.end = {x:0, y:0};
	    }
	}
};

LaunchPlatform.prototype.render = function(){
//	if(this.makeSound){
//		audio.changeColorAudio.play();
//		this.makeSound = false;
//	}
};

LaunchPlatform.prototype.getRemoteData = function(){

};

LaunchPlatform.prototype.renderRemoteData = function(remoteData, offset){
	
};

LaunchPlatform.prototype.start = function () {
	if(!this.launchForceTimer || !this.launchForceTimer.running){
		this.launchForceTimer = new THREE.Clock(false);
    	this.launchForceTimer.start();
	}
};

LaunchPlatform.prototype.stop = function () {
	if(this.launchForceTimer && this.launchForceTimer.running){
		this.launchForceTimer.stop();
		var v = this.getLaunchForceVector();
	    var s = new Ship({engine: this.engine});
	    s.setPosition(new THREE.Vector2(this.position.x, this.position.y));
	    s.setDirection(this.getLaunchForceVector().clone());
		this.engine.add(s);
	}

    this.forceVector = this.getCurrentForceVector();
};

LaunchPlatform.prototype.getPosition = function () {
    return this.position;
};

LaunchPlatform.prototype.getLaunchForceDirection = function () {
    var forceVector = this.getLaunchForceVector();
    if (!forceVector) {
        return new THREE.Vector2();
    }
    return forceVector.normalize();
};

LaunchPlatform.prototype.getLaunchForceVector = function () {
    return this.forceVector;
};

LaunchPlatform.prototype.getCurrentForce = function () {
    if (this.launchForceTimer) {
        var forcePercentageOfMaximum = (this.launchForceTimer.getElapsedTime() * 1000 / this.timeToReachMaxForce) % 1;
        return forcePercentageOfMaximum * this.maxForce;
    }
    return 0;
};

LaunchPlatform.prototype.getCurrentForceVector = function () {
    return this.getCurrentForceDirection().setLength(this.getCurrentForce());
};

LaunchPlatform.prototype.getCurrentForceDirection = function () {
    var result = new THREE.Vector2(0, 0);
    if (!this.engine.mousePosition) return result;

    result.sub(this.engine.mousePosition, this.position).normalize();

    return result;
};

if(typeof(exports) !== 'undefined'){
	exports.LaunchPlatform = LaunchPlatform;
}