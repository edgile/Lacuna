function Planet(){
    this.maxMassPlanet = 2000;
    this.maxInitialSpeedPlanet = 100;
    this.influencedByGravity = true;

    this.setDensity(10000);
};

Planet.inheritsFrom(SpaceObject);

Planet.prototype.getRadius = function () {
    return this._super() * 3;
};

Planet.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "green");

    return gradient;
};

Planet.prototype.setRandomValues = function () {
    this.baseClass.setRandomValues.call(this);

    this.setMass(Math.random() * maxmassPlanet + 1);
    this.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    this.setDirection(new THREE.Vector2(Math.random(), Math.random()).setLength(maxInitialSpeedPlanet * Math.random()));
};

Planet.prototype.render = function (context) {
    context.fillStyle = this.getGradient(context);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
    context.closePath();
    context.fill();
};
