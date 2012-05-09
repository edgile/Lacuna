/**
*   Represents a Planet.
*   @class
*   @extends SpaceObject
*/
var Planet = function(config){
    helpers.applyIf(Planet.defaultConfig, config);
    SpaceObject.call(this, config);

    //Visible elements
    this.circle = {type: 'circle', color: 'blue', center: {x: 0, y: 0}, radius: 5, fill: true}; 
    this.shapes = [this.circle];
};

Planet.inheritsFrom(SpaceObject);

Planet.defaultConfig = {
    type: 'planet',
    name: 'Planet',
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

SpaceObjects.planet = Planet;