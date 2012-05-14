/**
*   Represents a Ship.
*   @class
*   @extends SpaceObject
*/
var Ship = function (config) {
    helpers.applyIf(Ship.defaultConfig, config);
    SpaceObject.call(this, config);

    this.previousPosition = null;
    this.previousTrailDrop = 0

    // Visible elements fields 
    this.modelIndex = 1;
    this.ship = { type: 'circle', color: 'yellow', center: { x: 0, y: 0 }, radius: this.getRadius(), fill: true };
    this.flightShapes = [
        this.ship
    ];
    this.crashShapes = [
       { type: 'circle', width: 2, color: 'gray', center: { x: 0, y: 0 }, radius: 0 },
       { type: 'circle', width: 2, color: 'gray', center: { x: 0, y: 0 }, radius: 0 },
       { type: 'circle', width: 2, color: 'white', center: { x: 0, y: 0 }, radius: 0 }
	];
    this.shapes = this.flightShapes;
};

Ship.inheritsFrom(SpaceObject);

Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, crashing: 3, landing: 4, landed: 5 };
Ship.statusTimespan = { accelerating: 0, crashing: 5 };

Ship.defaultConfig = {
    type: 'ship',
    name: 'Ship',
    dropTrail: true,
    dropIntervalInMilliSeconds: 100,
    trailItemLifeTime: 1500,
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    density: 1,
    mass: 3000,
    static: false,
    canCollide: true,
    influencesGravitationalField: false,
    influencedByGravity: true,
    status: Ship.statusEnum.accelerating,
    editor: { visible: false }
};

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
        if (this.dropTrail) {
            this.previousTrailDrop += timeLapse * 1000 / this.engine.timeFactor;
            if (this.previousTrailDrop > this.dropIntervalInMilliSeconds) {
                this.previousTrailDrop = 0;
                var s = new TrailItem({ engine: this.engine, position: { x: this.position.x, y: this.position.y }, lifeInMilliseconds: this.trailItemLifeTime });
                this.engine.level.addSpaceObject(s);
            }
        }
    }
    this.elapsedTime += timeLapse;
};

Ship.prototype.setPosition = function (position) {
    // add previous point to the tail.
    if (this.position && this.position instanceof THREE.Vector2) {
        if (this.previousPosition == null || this.position.distanceTo(this.previousPosition) > 3) {
	        this.previousPosition = this.position.clone();
	    }
    }

    this.baseClass.setPosition.call(this, position);
};

Ship.prototype.getPreviousPosition = function () {
    return this.previousPosition;
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