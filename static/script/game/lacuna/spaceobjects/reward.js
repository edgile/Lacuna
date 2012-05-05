/**
*   Represents a reward that can be picked up by a ship.
*   @class
*   @extends SpaceObject
*/
function Reward(config) {
    this.type = "Reward";
    this.influencesGravity = false;
    this.influencedByGravity = false;
    this.static = true;
    this.shapes = [{ type: 'circle', color: 'violet', center: { x: 0, y: 0 }, radius: 2, fill: false}];
    this.points = 100;

    SpaceObject.call(this, config);
};

Reward.inheritsFrom(SpaceObject);

Reward.prototype.setRandomValues = function () {
};

SpaceObjects.reward = Reward;
