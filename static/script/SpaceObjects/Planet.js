/**
*   Represents a Planet.
*   @class
*   @extends SpaceObject
*/
function Planet(config){
	helpers.apply(config, this);
    this.maxMassPlanet = 2000;
    this.maxInitialSpeedPlanet = 100;
    this.influencedByGravity = true;

    this.setDensity(10000);
};

Planet.inheritsFrom(SpaceObject);

Planet.prototype.getRadius = function () {
    return this.baseClass.getRadius.call(this);
};

Planet.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "green");

    return gradient;
};

Planet.prototype.setRandomValues = function () {
    this.baseClass.setRandomValues.call(this);

    this.setMass(Math.random() * this.maxMassPlanet + 1);
    this.setPosition(new THREE.Vector2(Math.random() * this.engine.width, Math.random() * this.engine.height));
    this.setDirection(new THREE.Vector2(Math.random(), Math.random()).setLength(this.maxInitialSpeedPlanet * Math.random()));
};

Planet.prototype.render = function (context) {
    context.fillStyle = this.getGradient(context);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
    context.closePath();
    context.fill();
};
