/**
Main user interface flow for the game.
@class
 */
function flow(config){
	helpers.apply(config, this);
	this.rightButtonDown = false;
	this.engine.keyboardController.upListeners.push(this.keyboardHandler.bind(this));
	this.scoreBar = new ScoreBar({
		engine: this.engine,
		hidden: false
	});
	this.menu = new menu({
		engine: this.engine,
		mainMenu: mainMenu,
		flow: this
	});
	this.start(null, new randomAi({
		engine: this.engine
	}));
	this.menu.show();
}

flow.prototype.update = function(timeLapse){
	if(this.rightButtonDown != this.engine.buttonDown && this.buttonDown){
		this.menu.toggle();
	}
	this.rightButtonDown = this.engine.buttonDown;
	if(this.ai){
		this.ai.update(timeLapse);
	}
	this.engine.level.update(timeLapse);
	this.menu.update();
};

flow.prototype.getEntities = function(){
	var gameUI = [];
	if(!this.menu.hidden){
		gameUI.push(this.menu);
	}
	if(!this.scoreBar.hidden){
		gameUI.push(this.scoreBar);
	}
	return this.engine.level.spaceObjects.concat(gameUI);
};

flow.prototype.keyboardHandler = function(keyCode){
	if(keyCode === 77){ // M
		this.menu.toggle();
	}
};

flow.prototype.defaultLevel = 'onestarlevel';

flow.prototype.start = function(levelName, ai){
	this.ai = ai;
	this.levelName = levelName || this.levelName || this.defaultLevel;
	this.engine.level = Levels.load({
		gameId: Constants.gameId,
		levelId: this.levelName,
		engine: this.engine,
		aiMode: this.ai != null
	});
	this.scoreBar.hidden = this.ai != null;
	this.scoreBar.reset();
	this.menu.hide();
};

// Register with the engine
Engine.games.lacuna = flow;