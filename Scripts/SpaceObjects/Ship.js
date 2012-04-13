var Ship = SpaceObject.extend({
    init: function () {
        this._super();

        this._className = "Ship";
        this.mass = 3000;
        this.density = 1;
        this.influencedByGravity = true;
    },

    getGradient: function (context) {
        var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "yellow");

        return gradient;
    },

    getRadius: function () {
        return 4;
    },

    draw: function (context) {
        context.fillStyle = this.getGradient(context);
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
        context.closePath();
        context.fill();
    }
});
