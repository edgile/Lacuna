/**
*   Represents a Planet.
*   @class
*   @extends SpaceObject
*/
var Planet = function(config){
    SpaceObject.call(this, config);

    //Visible elements
    this.circle = {type: 'circle', color: 'blue', center: {x: 0, y: 0}, radius: 5, fill: true}; 
    this.shapes = [this.circle];
};

Planet.inheritsFrom(SpaceObject);

SpaceObjects.planet = Planet;