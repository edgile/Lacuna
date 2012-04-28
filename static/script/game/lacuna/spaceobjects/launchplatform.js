/**
*   Represents the launch platform for ships.
*   @class
*   @extends SpaceObject
*/
var LaunchPlatform = function(config){
	helpers.apply(config, this);
	
	// Game logic fields
	this.type = 'launchplatform';
	this.position = this.position || {x:this.engine.width / 2, y: 50};
    this.maxForce = 13000;
    this.timeToReachMaxForce = 1500;

    this.canCollide = false;
    this.influencedByGravity = false;
    this.influencesGravitationalField = false;
    this.static = true;

    this.pointerLocation = null;
    this.launchForceTimer = null;
    this.forceVector = null;
    this.previousForceDirection = new THREE.Vector2(0, 0);
    this.setPosition(new THREE.Vector2());
    this.setMass(1);
    this.setDensity(1);
    
    // Visible elements fields 
    this.modelIndex = 1;
	this.aimLine = {type: 'line', width: 3, color: 'gray', start: {x: 0, y: 39}, end: {x: 0, y: 48}};
	this.forceLine = {type: 'line', width: 3, color: 'green', start: {x: 0, y: 0}, end: {x: 0, y: 0}};
	this.defaultShapes = [
	    {type: 'line', width: 2, color: 'red', start: {x: 0, y: 5}, end: {x: 0, y: -5}},
	    {type: 'line', width: 2, color: 'red', start: {x: 5, y: 0}, end: {x: -5, y: 0}},
	    {type: 'circle', width: 1, color: 'gray', center: {x: 0, y: 0}, radius: 40},
	    this.aimLine,
	    this.forceLine
	];
	this.shapes = this.defaultShapes;
};

LaunchPlatform.inheritsFrom(SpaceObject);

LaunchPlatform.prototype.hidden = false;

/**
 * Makes the LaunchPlatform visible
 * @public
 */
LaunchPlatform.prototype.show = function(){
	this.hidden = false;
	
	this.shapes = this.defaultShapes;
}

/**
 * Hides the LaunchPlatform
 * @public
 */
LaunchPlatform.prototype.hide = function(){
	this.hidden = true;

	this.shapes = [];
}

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

LaunchPlatform.prototype.start = function () {
	if(!this.hidden && !this.launchForceTimer || !this.launchForceTimer.running){
		this.launchForceTimer = new THREE.Clock(false);
    	this.launchForceTimer.start();
	}
};

LaunchPlatform.prototype.stop = function () {
	if(!this.hidden && this.launchForceTimer && this.launchForceTimer.running){
		this.launchForceTimer.stop();
		var v = this.getCurrentForceVector();
		// Cancel launches with 0 force / direction
		if(v.x != 0 || v.y != 0){
		    var s = new Ship({engine: this.engine});
		    s.setPosition(new THREE.Vector2(this.position.x, this.position.y));
		    s.setDirection(v.clone());
			this.engine.level.addSpaceObject(s);
		}
	}
};

LaunchPlatform.prototype.getPosition = function () {
    return this.position;
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
    if (this.engine.mousePosition){
    	if(this.engine.absoluteController){
    		result.sub(this.engine.mousePosition, this.position).normalize();
    	}
    	else {
    		if(this.engine.mousePosition.x == 0 && this.engine.mousePosition.y == 0){
    			result = new THREE.Vector2(this.previousForceDirection.x, this.previousForceDirection.y).normalize();
    		}
    		else{
    			result = new THREE.Vector2(this.engine.mousePosition.x, this.engine.mousePosition.y).normalize();
    			this.previousForceDirection = new THREE.Vector2(this.engine.mousePosition.x, this.engine.mousePosition.y);
    		}
    	}
	}	
    return result;
};
