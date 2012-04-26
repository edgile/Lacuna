/**
*   Represents a Star.
*   @class
*   @extends SpaceObject
*/
function Star(config) {
	helpers.apply(config, this);
	// Game logic fields
	this.type = 'star';
    this.minMassStar = 300000;
    this.maxMassStar = 50000;

    this.maxStarDensity = 10000;
    this.minStarDensity = 10000;

    this.maxInitialSpeedStar = 0;
    this.influencedByGravity = false;

    this.setDensity(10000);
    //Visible elements
    this.circle = {type: 'circle', color: 'red', center: {x: 0, y: 0}, radius: this.getRadius(), fill: true}; 
    this.shapes = [this.circle];
};

Star.prototype = new SpaceObject();
Star.prototype.baseClass = SpaceObject.prototype;

Star.prototype.setRandomValues = function () {
    this.baseClass.setRandomValues.call(this);

    this.setMass(Math.random() * (this.maxMassStar - this.minMassStar) + this.minMassStar);
    this.setDensity(Math.random() * (this.maxStarDensity - this.minStarDensity) + this.minStarDensity);
    this.setPosition(new THREE.Vector2(Math.random() * this.engine.width, Math.random() * this.engine.height));
    this.setDirection(new THREE.Vector2(this.maxInitialSpeedStar * Math.random(), this.maxInitialSpeedStar * Math.random()));
};

Star.prototype.update = function(timeLapse){
	this.circle.radius = this.getRadius();
};


