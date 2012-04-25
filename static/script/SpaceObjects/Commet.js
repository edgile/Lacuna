function Commet(config) {
	helpers.apply(this, config);
    this.maxSpeed = 1000;

    this.setDensity(1);
    this.influencedByGravity = true;
};

Commet.inheritsFrom(SpaceObject);

Commet.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "grey");
    gradient.addColorStop(1, "lightgrey");

    return gradient;
};

Commet.prototype.setRandomValues = function () {
    this.baseClass.setRandomValues.call(this);

    this.setMass(1);
    this.setPosition(new THREE.Vector2(Math.random() * this.engine.width, Math.random() * this.engine.height));
    this.setDirection(new THREE.Vector2(Math.random(), Math.random()).setLength(Math.random() * result.maxSpeed));
};

Commet.prototype.render = function (context) {
    context.fillStyle = this.getGradient(context);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
    context.closePath();
    context.fill();
};