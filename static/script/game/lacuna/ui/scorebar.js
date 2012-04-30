/*
 *   Score bar
 */
var ScoreBar = function(config){
	helpers.apply(config, this);
	this.name = 'scorebar';

	this.position = {
		x: this.engine.width / 2 , 
		y: this.engine.height - 36, 
		z: -40
	};
	this.hidden = false;
	this.direction = 1;
	this.finished = false;
	this.color = '#00F';
	this.texts = [];
};

ScoreBar.prototype.hasItem = function(identifier){
	for(var i = 0; i < this.texts.length; i++){
		if(this.texts[i].identifier == identifier){
			return true;
		}
	}
	return false;
};

ScoreBar.prototype.reset = function(){
	this.texts = [];
};

ScoreBar.prototype.addScoreBarItem = function(identifier, text, color, offsetLeft){
	this.texts.push ({
			identifier: identifier,
			font: '50px CBM64', 
			color: color, 
			text: text, 
			position: { 
				x: offsetLeft, 
				y: this.engine.height - 15
			} 
		}
	);
};

ScoreBar.prototype.setScore = function(identifier, newText){
	for(var i = 0; i < this.texts.length; i++){
		if(this.texts[i].identifier == identifier){
			this.texts[i].text = newText;
			break;
		}
	}
};