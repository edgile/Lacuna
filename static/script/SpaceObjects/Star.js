function Star() {
    this.minMassStar = 300000;
    this.maxMassStar = 50000;

    this.maxStarDensity = 10000;
    this.minStarDensity = 10000;

    this.maxInitialSpeedStar = 0;
    this.influencedByGravity = false;

    this.setDensity(10000);
};

Star.inheritsFrom(SpaceObject);

Star.prototype.setRandomValues = function () {
    this.baseClass.setRandomValues.call(this);

    this.setMass(Math.random() * (this.maxMassStar - this.minMassStar) + this.minMassStar);
    this.setDensity(Math.random() * (this.maxStarDensity - this.minStarDensity) + this.minStarDensity);
    this.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    this.setDirection(new THREE.Vector2(this.maxInitialSpeedStar * Math.random(), this.maxInitialSpeedStar * Math.random()));
};

Star.prototype.render = function (context) {
    var radius = this.getRadius();

    var grd = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, radius);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "yellow");

    context.fillStyle = grd;
    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, Math2PI, true);
    context.closePath();
    context.fill();
};

