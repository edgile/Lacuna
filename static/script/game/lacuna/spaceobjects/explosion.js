/**
*   Represents an explosion.
*   @class
*   @extends SpaceObject
*/
function Explosion(position, direction) {
    this.startStatus = 35;

    this.influencedByGravity = false;
    this.canCollide = false;

    this.setStatus(this.startStatus);
    this.setPosition(position);
    this.setDirection(direction);
    this.crashShapes = [
        {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
        {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
        {type: 'circle', width: 2, color: 'white', center: {x: 0, y: 0}, radius: 0}
 	];
    this.shapes = this.crashShapes;
};

Explosion.inheritsFrom(SpaceObject);

Explosion.prototype.update = function (timeLapse) {
    var currentStatus = this.getStatus();
    if (currentStatus > 0) {
	    this.crashShapes[0].radius = currentStatus;
	    this.crashShapes[1].radius = currentStatus;
	    this.crashShapes[2].radius = currentStatus;
	    this.setStatus(currentStatus - 1);
    }
};

Explosion.prototype.render = function (context) {

};