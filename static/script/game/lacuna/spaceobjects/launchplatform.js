/**
*   Represents the launch platform for ships.
*   @class
*   @extends SpaceObject
*/
var LaunchPlatform = function (config) {
    // Default values
    helpers.applyIf(LaunchPlatform.defaultConfig, config);
    SpaceObject.call(this, config);

    this.shipsLaunched = 0;
    this.pointerLocation = null;
    this.launchForceTimer = null;
    this.forceVector = null;
    this.previousForceDirection = new THREE.Vector2(0, 0);

    // Visible elements fields 
    this.modelIndex = 1;
    this.aimLine = { type: 'line', width: 3, color: 'gray', start: { x: 0, y: 39 }, end: { x: 0, y: 48} };
    this.forceLine = { type: 'line', width: 3, color: 'green', start: { x: 0, y: 0 }, end: { x: 0, y: 0} };
    this.defaultShapes = [
	    { type: 'line', width: 2, color: 'red', start: { x: 0, y: 5 }, end: { x: 0, y: -5} },
	    { type: 'line', width: 2, color: 'red', start: { x: 5, y: 0 }, end: { x: -5, y: 0} },
	    { type: 'circle', width: 1, color: 'gray', center: { x: 0, y: 0 }, radius: 40 },
	    this.aimLine,
	    this.forceLine
	];
    this.shapes = this.defaultShapes;
};

LaunchPlatform.inheritsFrom(SpaceObject);

LaunchPlatform.defaultConfig = {
    type: 'launchplatform',
    name: 'Launch platform',
    maxForce: 13000,
    timeToReachMaxForce: 1500,
    launchCapacity: 5,
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    density: 1,
    mass: 1,
    static: true,
    canCollide: false,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: false }
};

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
    if (!this.hidden && this.launchForceTimer && this.launchForceTimer.running) {
        this.launchForceTimer.stop();
        var v = this.getCurrentForceVector();
        // Cancel launches with 0 force / direction
        if (v.x != 0 || v.y != 0) {
            var s = new Ship({ engine: this.engine, position: {x: this.position.x, y: this.position.y}, direction: {x: v.x, y: v.y} });
            this.engine.level.addSpaceObject(s);
            this.shipsLaunched += 1;
            Lacuna.gameState.totalShipsLaunched += 1;
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

SpaceObjects.launchplatform = LaunchPlatform;