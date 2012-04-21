function Explosion(position) {
    this.startStatus = 50;

    this.influencedByGravity = false;
    this.canCollide = false;

    this.setStatus(this.startStatus);
    this.setPosition(position);
};

Explosion.inheritsFrom(SpaceObject);

Explosion.prototype.render = function (context) {
    var currentStatus = this.getStatus();
    if (currentStatus > 0) {

        context.strokeStyle = "gray";
        context.beginPath();
        context.arc(this.position.x, this.position.y, currentStatus, 0, Math2PI, true);
        context.stroke();
        context.closePath();

        context.strokeStyle = "gray";
        context.beginPath();
        context.arc(this.position.x, this.position.y, currentStatus / 2, 0, Math2PI, true);
        context.stroke();
        context.closePath();

        context.strokeStyle = "white";
        context.beginPath();
        context.arc(this.position.x, this.position.y, currentStatus / 3, 0, Math2PI, true);
        context.stroke();
        context.closePath();

        this.setStatus(currentStatus - 1);
    }
};