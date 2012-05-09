/**
*   Represents a text message that is shown on screen.
*   @class
*   @extends SpaceObject
*/
function TextSpaceObject(config) {
    helpers.applyIf(TextSpaceObject.defaultConfig, config);
    SpaceObject.call(this, config);

    this.timeDisplayed = 0;

    SpaceObject.call(this, config);

    this.setPosition(this.position);
    this.setDirection(this.direction);
    this.shapes = [{type: 'text', text: this.text, color: this.textColor, size: this.textSize}];
};

TextSpaceObject.inheritsFrom(SpaceObject);

TextSpaceObject.defaultConfig = {
    type: 'textspaceobject',
    name: 'TextSpaceObject',
    text: '',
    textSize: 25,
    textColor: 'white',
    displayTime: 100,
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    static: false,
    canCollide: false,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active
};

TextSpaceObject.prototype.update = function (timeLapse) {
	this.timeDisplayed += timeLapse;
	if(this.timeDisplayed >= this.displayTime){
		this.setStatus(SpaceObject.statusEnum.finished);
	}
};

/**
 * Register TextSpaceObject
 */
SpaceObjects.textspaceobject = TextSpaceObject;
