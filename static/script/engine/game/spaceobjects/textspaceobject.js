/**
*   Represents a text message that is shown on screen.
*   @class
*   @extends SpaceObject
*/
function TextSpaceObject(config) {
	SpaceObject.call(this, config);
	
	this.influencesGravitationalField = false;
    this.influencedByGravity = false;
    this.canCollide = false;
    this.displayTime = 50;
    this.timeDisplayed = 0;
    this.textSize = 25;

    this.setPosition(this.position);
    this.setDirection(this.direction);
    this.shapes = [{type: 'text', text: config.text, color: "white", size: this.textSize}];
};

TextSpaceObject.inheritsFrom(SpaceObject);

TextSpaceObject.prototype.update = function (timeLapse) {
	this.timeDisplayed += timeLapse;
	if(this.timeDisplayed >= this.displayTime){
		this.setStatus(SpaceObject.statusEnum.finished);
	}
};
