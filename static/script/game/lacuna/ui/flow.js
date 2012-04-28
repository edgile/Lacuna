/**
Main user interface flow for the game.
@class

 */
function flow(config){
	helpers.apply(config, this);
	this.engine.keyboardController.upListeners.push(this.keyboardHandler.bind(this));
	this.scorebar = new scorebar({
		engine: this.engine
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
	if(!this.scorebar.hidden){
		gameUI.push(this.scorebar);
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
		gameId: 'lacuna',
		levelId: this.levelName,
		engine: this.engine
	});
	this.menu.hide();
};

// Register with the engine
Engine.games.lacuna = flow;