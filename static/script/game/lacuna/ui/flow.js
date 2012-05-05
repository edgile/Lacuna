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

	// Need to find a place to put this
	var lacunaBackgroundFile = {
		name: 'lacunabackground',
		src: '/resources/svg/background.svg',
		width: 960,
		height: 640,
		items: {
			background: {x: 0, y: 0, width: 960, height: 640}
		}
	};
	
	var lacunaSpriteFile = {
		name: 'lacuna',
		src: '/resources/svg/sprites.svg',
		width: 800,
		height: 600,
		items: {
			star150: {x: 0, y: 0, width: 150, height: 150},
			star100: {x: 150, y: 0, width: 100, height: 100},
			star75: {x: 250, y: 0, width: 75, height: 75},
			star50: {x: 325, y: 0, width: 50, height: 50}
		}
	};
	
	// Need to find a place to put this
	this.spriteManager = new SpriteManager({
		files:[lacunaBackgroundFile, lacunaSpriteFile ],
		onload: function(){
			
		}.bind(this)
	});
	
	this.background = new background();
	
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
	this.background.update(timeLapse);
	this.engine.level.update(timeLapse);
	this.menu.update();
};

flow.prototype.getEntities = function(){
	var gameUI = [this.background];
	gameUI = gameUI.concat(this.engine.level.spaceObjects);
	if(!this.menu.hidden){
		gameUI.push(this.menu);
	}
	if(!this.scoreBar.hidden){
		gameUI.push(this.scoreBar);
	}
	return gameUI;
};

flow.prototype.keyboardHandler = function(keyCode){
	if(keyCode === 77){ // M
		this.menu.toggle();
	}
};

flow.prototype.defaultLevel = 'l_0101';

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