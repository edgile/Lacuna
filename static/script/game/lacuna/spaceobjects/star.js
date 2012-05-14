/**
*   Represents a Star.
*   @class
*   @extends SpaceObject
*/
function Star(config) {
    // Default values
    helpers.applyIf(Star.defaultConfig, config);
    SpaceObject.call(this, config);

    // Visible elements
    this.sprite  = {
		type: 'sprite', 
		file: 'lacuna', 
		sprite: 'star50',
		position: {x: -25, y: -25},
		scale: 1
	};
    this.circle = {type: 'circle', color: 'red', center: {x: 0, y: 0}, radius: this.getRadius(), fill: false}; 
    this.shapes = [this.sprite, this.circle];
};

Star.inheritsFrom(SpaceObject);

Star.defaultConfig = {
    type: 'star',
    name: 'Star',
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    density: 1,
    mass: 1,
    static: true,
    canCollide: true,
    influencesGravitationalField: true,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: true }
};

/**
 * Register star as a SpaceObject
 */
SpaceObjects.star = Star;
