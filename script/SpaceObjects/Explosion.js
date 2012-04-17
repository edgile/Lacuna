var Explosion = function (position) {
    this._className = "Explosion";

    this.influencedByGravity = false;
    this.canCollide = false;

    this.setPosition(position);
}

Explosion.inheritsFrom(SpaceObject)

Explosion.prototype.draw = function(context) {
}