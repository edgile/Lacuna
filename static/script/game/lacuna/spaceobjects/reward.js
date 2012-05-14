/**
*   Represents a reward that can be picked up by a ship.
*   @class
*   @extends SpaceObject
*/
function Reward(config) {
    helpers.applyIf(Reward.defaultConfig, config);
    SpaceObject.call(this, config);

    this.shapes = [{ type: 'circle', color: 'violet', center: { x: 0, y: 0 }, radius: 2, fill: false}];
};

Reward.inheritsFrom(SpaceObject);

Reward.defaultConfig = {
    type: 'reward',
    name: 'Reward',
    points: 100,
    position: { x: 0, y: 0 },
    static: true,
    canCollide: true,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: true }
};
SpaceObjects.reward = Reward;
