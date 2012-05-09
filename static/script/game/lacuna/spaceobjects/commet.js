/**
*   Represents a commet.
*   @class
*   @extends SpaceObject
*/
function Commet(config) {
    helpers.applyIf(Commet.defaultConfig, config);
	SpaceObject.call(this, config);
};

Commet.inheritsFrom(SpaceObject);

Commet.defaultConfig = {
    type: 'commet',
    name: 'Commet',
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    density: 1,
    mass: 1,
    static: false,
    canCollide: true,
    influencesGravitationalField: true,
    influencedByGravity: true,
    status: SpaceObject.statusEnum.active
};

Commet.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "grey");
    gradient.addColorStop(1, "lightgrey");

    return gradient;
};

Commet.prototype.render = function (context) {
    context.fillStyle = this.getGradient(context);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
};

SpaceObjects.commet = Commet;
