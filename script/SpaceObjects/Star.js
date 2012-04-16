var minMassStar = 200000;
var maxMassStar = 200000;

var maxStarDensity = 10000;
var minStarDensity = 10000;

var maxInitialSpeedStar = 0;

var Star = SpaceObject.extend({
    init: function () {
        this._super();

        this._className = "Star";
        this.setDensity(10000);

        this.influencedByGravity = false;
    },

    draw: function (context) {
        var radius = this.getRadius();

        var grd = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, radius);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "yellow");

        context.fillStyle = grd;
        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, 0, Math2PI, true);
        context.closePath();
        context.fill();
    }
});

function generateRandomStar() {
    var s = new Star();

    s.setMass(Math.random() * (maxMassStar - minMassStar) + minMassStar);
    s.setDensity(Math.random() * (maxStarDensity - minStarDensity) + minStarDensity);
    s.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    s.setDirection(new THREE.Vector2(maxInitialSpeedStar * Math.random(), maxInitialSpeedStar * Math.random()));

    return s;
};
