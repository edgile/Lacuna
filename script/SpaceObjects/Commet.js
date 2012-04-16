var Commet = SpaceObject.extend({
    maxSpeed: 1000,

    init: function () {
        this._super();

        this._className = "Commet";
        this.setDensity(1);

        this.influencedByGravity = true;
    },

    getGradient: function (context) {
        var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(1, "lightgrey");

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

function generateRandomCommet() {
    var result = new Commet();

    result.setMass(1);
    result.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    result.setDirection(new THREE.Vector2(Math.random(), Math.random()));
    result.direction.setLength(Math.random() * result.maxSpeed);

    return b;
};

