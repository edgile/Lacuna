/**
*   Represents an explosion.
*   @class
*   @extends SpaceObject
*/
function Explosion(config) {
    helpers.applyIf(Explosion.defaultConfig, config);
    SpaceObject.call(this, config);

    this.crashShapes = [
        {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
        {type: 'circle', width: 2, color: 'gray', center: {x: 0, y: 0}, radius: 0},
        {type: 'circle', width: 2, color: 'white', center: {x: 0, y: 0}, radius: 0}
 	];
    this.shapes = this.crashShapes;
};

Explosion.inheritsFrom(SpaceObject);

Explosion.defaultConfig = {
    type: 'explosion',
    name: 'Explosion',
    timeVisible: 100,
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    static: false,
    canCollide: false,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: false }
};

Explosion.prototype.update = function (timeLapse) {
    if(this.getStatus() != SpaceObject.statusEnum.finished) {
        this.timeVisible -= timeLapse;
        if (this.timeVisible > 0) {
	        this.crashShapes[0].radius = this.timeVisible;
	        this.crashShapes[1].radius = 2 * this.timeVisible / 4;
	        this.crashShapes[2].radius = this.timeVisible / 4;
        } else {
            this.setStatus(SpaceObject.statusEnum.finished);
        }
    }
};

SpaceObjects.explosion = Explosion;
