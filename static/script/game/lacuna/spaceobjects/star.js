/**
*   Represents a Star.
*   @class
*   @extends SpaceObject
*/
function Star(config) {
    // Default values
    this.type = 'star';
    this.static = true;
    this.influencedByGravity = false;
    this.influencesGravity = true;

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

/**
 * Register star as a SpaceObject
 */
SpaceObjects.star = Star;
