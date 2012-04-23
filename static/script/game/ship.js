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
    this.setStatus(Ship.statusEnum.accelerating);
    this.setMass(3000);
    this.setDensity(1);
    // Visible elements fields 
    this.modelIndex = 1;
    this.tail = {type: 'polyline', width: 2, color: 'yellow', points: new PolyLine()};
    this.flightShapes = [
        {type: 'circle', width: this.getRadius(), color: 'yellow', center: {x: 0, y: 0}, radius: 40, fill: true},
        this.tail
    ];
    this.crashShapes = [];
	this.shapes = this.flightShapes;
};

Ship.prototype = new SpaceObject();

Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, crashing: 3, landing: 4, landed: 5 };
Ship.statusTimespan = { accelerating: 50, crashing: 5, landing: 10 };

Ship.prototype.update = function(time){
	if(this.engine.mode !== 'client'){
		this.startTime = this.startTime || time;
		this.elapsedTime = this.startTime - time;
	    var status = this.getStatus();
	    if (status == Ship.statusEnum.accelerating && this.elapsedTime >= Ship.statusTimespan.accelerating) {
	        this.setStatus(Ship.statusEnum.flying);
	    }
	    else if (status == Ship.statusEnum.crashing && this.elapsedTime >= Ship.statusTimespan.crashing) {
	        this.setStatus(Ship.statusEnum.finished);
	    }
	    else if (status == Ship.statusEnum.crashing) {
	        this.getDirection().setLength(((Ship.statusTimespan.crashing - this.elapsedTime) / Ship.statusTimespan.crashing) * this.getDirection().length());
	    }
	    else if (status == Ship.statusEnum.landing && this.elapsedTime >= Ship.statusTimespan.landing) {
	        this.setStatus(Ship.statusEnum.landed);
	    }
	}
};

Ship.prototype.render = function(){
//	if(this.makeSound){
//		audio.changeColorAudio.play();
//		this.makeSound = false;
//	}
    if(this.getStatus() == Ship.statusEnum.crashing) {
        this.renderCrache(context);
    }
    else {
        context.fillStyle = this.getGradient(context);
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
        context.fill();
        context.closePath();

        this.renderTail(context);
    }
};

Ship.prototype.getRemoteData = function(){

};

Ship.prototype.renderRemoteData = function(remoteData, offset){
	
};

Ship.prototype.setPosition = function (position) {
    // add previous point to the tail.
    if (this.position) {
        this.tail.points.addPoint(this.position.clone());
    }

    this.baseClass.setPosition.call(this, position);

    // limit the length of the tail.
    if (this.maxTailLength > 0) {
        while (this.tail.points.getLength() > this.maxTailLength) {
            this.tail.points.removePoint(0);
        }
    }
};

Ship.prototype.setStatus = function (status) {
    this.baseClass.setStatus.call(this, status);

    this.influencedByGravity = status == Ship.statusEnum.flying || status == Ship.statusEnum.accelerating;
    this.elapsedTime = 0;
};

Ship.prototype.getRadius = function () {
    return 4;
};

Ship.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "yellow");

    return gradient;
};

Ship.prototype.renderCrache = function (context) {
    context.strokeStyle = "gray";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, Ship.statusTimespan.crashing - this.elapsedTime) * 2, 0, Math2PI, true);
    context.stroke();
    context.closePath();

    context.strokeStyle = "gray";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.crashing - this.elapsedTime)), 0, Math2PI, true);
    context.stroke();
    context.closePath();

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.crashing - this.elapsedTime) * 2 / 3), 0, Math2PI, true);
    context.stroke();
    context.closePath();
};

Ship.prototype.renderTail = function (context) {
    var localTail = this.tail;

    if (localTail.points.length < 2) return;

    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(localTail.points[0].x, localTail.points[0].y);
    for (var i = 1, numberOfPoints = localTail.points.length; i < numberOfPoints; i++) {
        context.lineTo(localTail.points[i].x, localTail.points[i].y);
    }
    context.stroke();
    context.closePath();
};


if(typeof(exports) !== 'undefined'){
	exports.Ship = Ship;
}