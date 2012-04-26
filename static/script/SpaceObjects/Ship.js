/**
*   Represents a Ship.
*   @class
*   @extends SpaceObject
*/
var Ship = function(config){
	helpers.apply(config, this);
	// Game logic fields
	this.type = 'ship';
	this.position = this.position || new THREE.Vector2(0,0);
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

Ship.inheritsFrom(SpaceObject);

Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, crashing: 3, landing: 4, landed: 5 };
Ship.statusTimespan = { accelerating: 0, crashing: 5 };

Ship.prototype.update = function (timeLapse) {
    // Update the status of the ship
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
    // Update the status of the visuals
    if (this.getStatus() == Ship.statusEnum.crashing) {
        this.crashShapes[0].radius = Math.max(0, Ship.statusTimespan.crashing - this.elapsedTime) * 2;
        this.crashShapes[1].radius = Math.max(0, Ship.statusTimespan.crashing - this.elapsedTime);
        this.crashShapes[2].radius = Math.max(0, Ship.statusTimespan.crashing - this.elapsedTime) * 2 / 3;
        this.shapes = this.crashShapes;
    }
    else if (this.getStatus() == Ship.statusEnum.landing) {
        this.ship.color = "red";
    }
    else if (this.getStatus() == Ship.statusEnum.landed) {
        this.shapes = [this.ship];
        this.ship.color = "green";
    }
    else if (this.getStatus() == Ship.statusEnum.finished) {
        // Do nothing ...
    }
    else {
        this.shapes = this.flightShapes;
    }
    this.elapsedTime += timeLapse;
};

Ship.prototype.setPosition = function (position) {
    // add previous point to the tail.
    if (this.position) {
  	  if (this.tail.points.points.length == 0 || (this.tail.points.points.length > 0 && this.position.distanceTo(this.tail.points.points[this.tail.points.points.length - 1]) > 3)) {
	      this.tail.points.addPoint(this.position.clone());
	  }
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
    this.elapsedTime = 0;
};

Ship.prototype.getRadius = function () {
    return 4;
};

//function Ship() {
//    this.maxTailLength = 250;
//    this.tail = new PolyLine();
//
//    this.influencedByGravity = true;
//    this.influencesGravitationalField = false;
//
//    this.setStatus(Ship.statusEnum.accelerating);
//    this.setMass(3000);
//    this.setDensity(1);
//};
//
//Ship.inheritsFrom(SpaceObject);
//
//Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, crashing: 3, landing: 4, landed: 5 };
//Ship.statusTimespan = { accelerating: 0, crashing: 5 };
//
//Ship.prototype.setPosition = function (position) {
//    // add previous point to the tail.
//    if (this.position) {
//        if (this.tail.points.length == 0 || (this.tail.points.length > 0 && this.position.distanceTo(this.tail.points[this.tail.points.length - 1]) > 3)) {
//            this.tail.addPoint(this.position.clone());
//        }
//    }
//
//    this.baseClass.setPosition.call(this, position);
//
//    // limit the length of the tail.
//    if (this.maxTailLength > 0) {
//        while (this.tail.getLength() > this.maxTailLength) {
//            this.tail.removePoint(0);
//        }
//    }
//};
//
//Ship.prototype.getPreviousPosition = function () {
//    if (this.tail && this.tail.points.length > 1) return this.tail.points[this.tail.points.length - 2];
//};
//
//Ship.prototype.update = function (timeLapse) {
//    this.baseClass.update.call(this);
//
//    var status = this.getStatus();
//    if (status == Ship.statusEnum.accelerating && this.elapsedTime >= Ship.statusTimespan.accelerating) {
//        this.setStatus(Ship.statusEnum.flying);
//    }
//    else if (status == Ship.statusEnum.crashing && this.elapsedTime >= Ship.statusTimespan.crashing) {
//        this.setStatus(Ship.statusEnum.finished);
//    }
//    else if (status == Ship.statusEnum.crashing) {
//        this.getDirection().setLength(((Ship.statusTimespan.crashing - this.elapsedTime) / Ship.statusTimespan.crashing) * this.getDirection().length());
//    }
//    this.elapsedTime += timeLapse;
//};
//
//Ship.prototype.setStatus = function (status) {
//    this.baseClass.setStatus.call(this, status);
//
//    this.influencedByGravity = status == Ship.statusEnum.flying || status == Ship.statusEnum.accelerating;
//    this.canCollide = this.influencedByGravity;
//    this.static = this.status == Ship.statusEnum.landed;
//    this.elapsedTime = 0;
//};
//
//Ship.prototype.getRadius = function () {
//    return 4;
//};
//
//Ship.prototype.getGradient = function (context) {
//    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
//    gradient.addColorStop(0, "white");
//    gradient.addColorStop(1, "yellow");
//
//    return gradient;
//};
//
//Ship.prototype.render = function (context) {
//    if (this.getStatus() == Ship.statusEnum.crashing) {
//        this.renderCrache(context);
//    }
//    else if (this.getStatus() == Ship.statusEnum.landing) {
//        this.renderLanding(context);
//    }
//    else if (this.getStatus() == Ship.statusEnum.landed) {
//        this.renderLanded(context);
//    }
//    else if (this.getStatus() == Ship.statusEnum.finished) {
//        // Do nothing ...
//    }
//    else {
//        context.fillStyle = this.getGradient(context);
//        context.beginPath();
//        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
//        context.fill();
//        context.closePath();
//
//        this.renderTail(context);
//    }
//};
//
//Ship.prototype.renderLanding = function(context){
//        context.fillStyle = "red";
//        context.beginPath();
//        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
//        context.fill();
//        context.closePath();
//};
//
//Ship.prototype.renderLanded = function (context) {
//    context.fillStyle = "green";
//    context.beginPath();
//    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
//    context.fill();
//    context.closePath();
//};
//
//Ship.prototype.renderCrache = function (context) {
//    context.strokeStyle = "gray";
//    context.beginPath();
//    context.arc(this.position.x, this.position.y, Math.max(0, Ship.statusTimespan.crashing - this.elapsedTime) * 2, 0, Math2PI, true);
//    context.stroke();
//    context.closePath();
//
//    context.strokeStyle = "gray";
//    context.beginPath();
//    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.crashing - this.elapsedTime)), 0, Math2PI, true);
//    context.stroke();
//    context.closePath();
//
//    context.strokeStyle = "white";
//    context.beginPath();
//    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.crashing - this.elapsedTime) * 2 / 3), 0, Math2PI, true);
//    context.stroke();
//    context.closePath();
//};
//
//Ship.prototype.renderTail = function (context) {
//    var localTail = this.tail;
//
//    if (localTail.points.length < 2) return;
//
//    context.strokeStyle = "white";
//    context.lineWidth = 2;
//    context.beginPath();
//    var currentPosition = this.getPosition().clone();
//    context.moveTo(currentPosition.x, currentPosition.y);
//    for (var numberOfPoints = localTail.points.length, i = numberOfPoints - 1; i >= 0; i--) {
//        context.lineTo(localTail.points[i].x, localTail.points[i].y);
//    }
//    context.stroke();
//    context.closePath();
//};