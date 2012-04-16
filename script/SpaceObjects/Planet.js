var maxmassPlanet = 2000;
var maxInitialSpeedPlanet = 100;

var Planet = SpaceObject.extend({
    init: function () {
        this._super();

        this._className = "Planet";

        this.setDensity(10000);
        this.influencedByGravity = true;
    },

    getRadius: function () {
        return this._super() * 3;
    },

    getGradient: function (context) {
        var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "green");

        return gradient;
    },

    draw: function (context) {
        context.fillStyle = this.getGradient(context);
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
        context.closePath();
        context.fill();
    }
});

function generateRandomPlanet() {
    var b = new Planet();

    b.setMass(Math.random() * maxmassPlanet + 1);
    b.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    b.setDirection(new THREE.Vector2(maxInitialSpeedPlanet * Math.random(), maxInitialSpeedPlanet * Math.random()));

    return b;
};

