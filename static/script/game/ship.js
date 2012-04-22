/*
 *   Ship
 */
if(typeof(require) !== 'undefined'){
	var helpers = require("./helpers").helpers;
	var entity = require("./entity").entity;
}
	
var Ship = function(config){
	helpers.apply(config, this);
	// Game logic fields
	this.type = 'ship';
	this.position = this.position || {x:this.engine.width / 2, y: 50};
    this.maxTailLength = 250;
    this.influencedByGravity = true;
    this.influencesGravitationalField = false;
    this.setStatus(Ship.statusEnum.accelerating);
    this.setMass(3000);
    this.setDensity(1);
    // Visible elements fields 
    this.modelIndex = 1;
    this.tail = {type: 'polyline', position: {x: 0, y: 0}, width: 2, color: 'yellow', points: new PolyLine()};
    this.ship = {type: 'circle', color: 'yellow', center: {x: 0, y: 0}, radius: this.getRadius(), fill: true};
    this.flightShapes = [
        this.ship,
        this.tail
    ];
    this.crashShapes = [
       {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
       {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
       {type: 'circle', width: 2, color: 'white', center: {x: 0, y: 0}, radius: 0}
	];
    this.shapes = this.flightShapes;
};

Ship.prototype = new SpaceObject();
Ship.prototype.baseClass = SpaceObject.prototype;

Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, craching: 3, landing: 4, landed: 5 };
Ship.statusTimespan = { accelerating: 0, craching: 5 };

Ship.prototype.update = function(time){
	if(this.engine.mode !== 'client'){
		this.startTime = this.startTime || time;
		this.elapsedTime = time - this.startTime;
	    var status = this.getStatus();
	    if (status == Ship.statusEnum.accelerating && this.elapsedTime >= Ship.statusTimespan.accelerating) {
	        this.setStatus(Ship.statusEnum.flying);
	    }
	    else if (status == Ship.statusEnum.craching && this.elapsedTime >= Ship.statusTimespan.craching) {
	        this.setStatus(Ship.statusEnum.finished);
	    }
	    else if (status == Ship.statusEnum.craching) {
	        this.getDirection().setLength(((Ship.statusTimespan.craching - this.elapsedTime) / Ship.statusTimespan.craching) * this.getDirection().length());
	    }
	}
	if (this.getStatus() == Ship.statusEnum.craching) {
		this.crashShapes[0].radius = Math.max(0, Ship.statusTimespan.craching - this.elapsedTime) * 2;
		this.crashShapes[1].radius = Math.max(0, Ship.statusTimespan.craching - this.elapsedTime);
		this.crashShapes[2].radius = Math.max(0, Ship.statusTimespan.craching - this.elapsedTime) * 2 / 3;
    	this.shapes = this.crashShapes;
    }
    else if (this.getStatus() == Ship.statusEnum.landing) {
        this.ship.color = "red";
        this.flightShapes.pop();
    }
    else if (this.getStatus() == Ship.statusEnum.landed) {
    	this.ship.color = "green";
    	this.flightShapes.pop();
    }
    else if (this.getStatus() == Ship.statusEnum.finished) {
        // Do nothing ...
    }
    else {
    	this.shapes = this.flightShapes;
    }
};

Ship.prototype.render = function(){
    
};

Ship.prototype.getRemoteData = function(){

};

Ship.prototype.renderRemoteData = function(remoteData, offset){
	
};

Ship.prototype.setPosition = function (position) {
    // add previous point to the tail.
    if (this.position) {
        this.tail.points.addPoint(new THREE.Vector2(this.position.x, this.position.y));
    }
    this.baseClass.setPosition.call(this, position);

    // limit the length of the tail.
    if (this.maxTailLength > 0) {
        while (this.tail.points.getLength() > this.maxTailLength) {
            this.tail.points.removePoint(0);
        }
    }
};

Ship.prototype.getPreviousPosition = function () {
    if (this.tail && this.tail.points.points.length > 1) return this.tail.points.points[this.tail.points.points.length - 2];
};

Ship.prototype.setStatus = function (status) {
    this.baseClass.setStatus.call(this, status);

    this.influencedByGravity = status == Ship.statusEnum.flying || status == Ship.statusEnum.accelerating;
    this.canCollide = this.influencedByGravity;
    this.static = this.status == Ship.statusEnum.landed;
    this.startTime = null;
};

Ship.prototype.getRadius = function () {
    return 4;
};

if(typeof(exports) !== 'undefined'){
	exports.Ship = Ship;
}