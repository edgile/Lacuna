/**
*   Represents a text message that is shown on screen.
*   @class
*   @extends SpaceObject
*/
function TextSpaceObject(config) {
	this.influencesGravitationalField = false;
    this.influencedByGravity = false;
    this.canCollide = false;
    this.displayTime = 50;
    this.timeDisplayed = 0;
    this.textSize = 25;
    this.textColor = "white";
    this.text = "";

    SpaceObject.call(this, config);

    this.setPosition(this.position);
    this.setDirection(this.direction);
    this.shapes = [{type: 'text', text: this.text, color: this.textColor, size: this.textSize}];
};

TextSpaceObject.inheritsFrom(SpaceObject);

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
