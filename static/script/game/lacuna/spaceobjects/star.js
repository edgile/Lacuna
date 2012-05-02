/**
*   Represents a Star.
*   @class
*   @extends SpaceObject
*/
function Star(config) {
	SpaceObject.call(this, config);

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
    this.sprite  = {
		type: 'sprite', 
		file: 'lacuna', 
		sprite: 'star50',
		position: {x: -25, y: -25},
		scale: 1
	};
    this.circle = {type: 'circle', color: 'red', center: {x: 0, y: 0}, radius: this.getRadius(), fill: true}; 
    this.shapes = [this.sprite];
};

Star.inheritsFrom(SpaceObject);

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


