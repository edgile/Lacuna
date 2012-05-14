/**
*   Represents a trail item.
*   @class
*   @extends SpaceObject
*/
function TrailItem(config) {
    helpers.applyIf(TrailItem.defaultConfig, config);
    SpaceObject.call(this, config);

    this.defaultShapes = [
            { type: 'circle', width: 1, color: 'gray', center: { x: 0, y: 0 }, radius: 1 }
       ];
    this.shapes = this.defaultShapes;
    this.remainingTime = this.lifeInMilliseconds;
};

TrailItem.inheritsFrom(SpaceObject);

TrailItem.defaultConfig = {
    type: 'trailitem',
    name: 'Trail',
    lifeInMilliseconds: 5000,
    position: { x: 0, y: 0 },
    static: true,
    canCollide: false,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: false }
};

TrailItem.prototype.update = function (timeLapse) {
    if (this.getStatus() != SpaceObject.statusEnum.finished) {
        this.remainingTime -= timeLapse * 1000 / this.engine.timeFactor;
        if (this.remainingTime <= 0) {
            this.setStatus(SpaceObject.statusEnum.finished);
        }
    }
}


SpaceObjects.trailitem = TrailItem;
