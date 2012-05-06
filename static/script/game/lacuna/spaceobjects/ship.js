/**
*   Represents a Ship.
*   @class
*   @extends SpaceObject
*/
var Ship = function(config){
	SpaceObject.call(this, config);

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
    if (this.tail && this.tail.points.points.length > 1) return this.tail.points.points[this.tail.points.points.length - 1];
};

Ship.prototype.setStatus = function (status) {
    // Bookkeeping to track the number of ships that landed and/or exploded
    if (status == Ship.statusEnum.landed && this.status != Ship.statusEnum.landed) {
        Lacuna.gameState.totalShipsLanded += 1;
    } else if (status == Ship.statusEnum.crashing && this.status != Ship.statusEnum.crashing) {
        Lacuna.gameState.totalShipsExploded += 1;
    }

    this.baseClass.setStatus.call(this, status);


    this.influencedByGravity = status == Ship.statusEnum.flying || status == Ship.statusEnum.accelerating;
    this.canCollide = this.influencedByGravity;
    this.static = this.status == Ship.statusEnum.landed;
    this.elapsedTime = 0;
};

Ship.prototype.getRadius = function () {
    return 4;
};

SpaceObjects.ship = Ship;