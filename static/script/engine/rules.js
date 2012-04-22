if(typeof(require) !== 'undefined'){
	var entity = require("./entity").entity;
	var helpers = require("./helpers").helpers;
	var engine = require("./engine").engine;
}

var rules = function(config){
	helpers.apply(config, this);
	this.initialized = false;
	this.engineId = 0; // This is important, if it is not 0 an new rules object gets created on the client
	this.name = 'rules';
	if(this.engine.mode !== 'server'){
		var uphandler = this.keyboardHandler.bind(this);
		if(document.addEventListener) { // Opera - Firefox - Google Chrome
			document.addEventListener("keyup", uphandler, false);
		}
		else if(document.attachEvent) { // Internet Explorer
			document.attachEvent("onkeyup", uphandler);
		}
		else if(!document.onkeydown && !document.onkeyup) {
			document.onkeyup = uphandler;
		}
	}
};
rules.prototype = new entity();

rules.prototype.initialize = function(){
	this.previousRightButtonDown = false;
	this.initialized = true;
	this.engine.canvasColor = '#000';
	this.engine.gameState = {
		player1Ship: null,
		player2Ship: null,
		player3Ship: null,
		player4Ship: null,
		player1Score: 0,
		player2Score: 0,
		gameOver: false
	};
	if(this.engine.mode !== 'server'){
		this.scoreBar = new scorebar({
			engine: this.engine
		});
		this.engine.add(this.scoreBar);
		if(!this.menu){
			this.menu = new menu({
				engine: this.engine,
				mainMenu: mainMenu
			});
			this.engine.add(this.menu);
			this.menu.setItems(mainMenu);
		}
	}
	if(this.engine.mode !== 'client'){
		this.engine.physics = new Space([
            new GravitationRule(),
            new MotionRule(),
            new CollisionRule(),
            new LandingRule()
        ]);
		this.engine.add ( this.engine.launchPlatform = new LaunchPlatform({
			engine: this.engine
		}) );
		var star = new Star({
			engine: this.engine
		});
		star.setRandomValues();
	    this.engine.add( star );
	    var landingZone = new LandingZone(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
	    landingZone.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
	    landingZone.setDirection(new THREE.Vector2(1, 0));
	    this.engine.add(landingZone);
//		this.engine.add( this.engine.gameState.player1Ship = new ship({
//			name        : 'Player 1',
//			type		: this.engine.mode == 'standalone' ? (this.engine.playerCount === 0 ? 'computer' : 'player') : (this.engine.player1 ? 'player' : 'computer'),
//			direction   : 1,
//			colorIndex  : 0,
//			position    : { x: 10, y : 10 }
//		}) );
	}
};

rules.prototype.parseControlString = function(s, buttonName, positionName){
	var parts = s.split(',');
	this.engine[positionName] = {
		x : parseFloat(parts[1]),
		y : parseFloat(parts[2])
	};
	this.engine[buttonName] = (parts[3] == 1);
};

rules.prototype.update = function(time){
	if(!this.initialized){
		this.initialize();
	}
	if(this.engine.mode !== 'server'){
		if(this.engine.gameState.gameOver !== this.previousGameOverState){
			this.previousGameOverState = this.engine.gameState.gameOver;
			if(this.engine.gameState.gameOver && (this.engine.playerCount > 0 || this.engine.mode === 'client')){
				this.showGameOver();
			}
			else if(this.engine.gameState.gameOver && this.engine.playerCount === 0){
				if(this.menu.finished){
					this.engine.reset();
				}
				else{
					this.engine.reset(this.menu);
				}
				return;
			}
			else if(this.engine.mode === 'client'){
				this.hideMenu();
			}
		}
		this.scoreBar.setScore(this.engine.gameState.player1Score, this.engine.gameState.player2Score);
		if(this.previousRightButtonDown !== this.engine.rightButtonDown){
			if(this.engine.rightButtonDown === false){
				this.toggleMenu();
			}
			this.previousRightButtonDown = this.engine.rightButtonDown;
		}
	}
	if(this.engine.mode !== 'client'){
//		var maxScore = this.engine.playerCount === 0 ? engine.maxAiScore : engine.maxScore;
//		this.engine.gameState.gameOver = (this.engine.gameState.player1Score === maxScore 
//										|| this.engine.gameState.player2Score === maxScore);
	}
};

rules.prototype.getRemoteData = function(){
	var result = null;
	var newMessage = "5," + this.engine.gameState.player1Score + "," +
	        this.engine.gameState.player2Score + "," +
	        (this.engine.gameState.gameOver ? 1 : 0);
	if(newMessage !== this.previousMessage){
		result = this.previousMessage = newMessage;
	}
	return result;
};

rules.prototype.renderRemoteData = function(remoteData, offset){
	this.engine.gameState.player1Score = remoteData[offset + 1];
	this.engine.gameState.player2Score = remoteData[offset + 2];
	this.engine.gameState.gameOver = (remoteData[offset + 3] === "1");
	return offset + 4;
};

rules.prototype.startSinglePlayerGame = function(){
	this.currentGameType = "startSinglePlayerGame";
	this.engine.mode = 'standalone';
	this.engine.playerCount = 1;
	this.engine.reset();
    this.hideMenu();
};

rules.prototype.startMultiPlayerGame = function () {
	this.currentGameType = "startMultiPlayerGame";
    // Sends request game message to the server (the server will start an engine on the server in 'server' mode)
	if(this.engine.socket){
		this.engine.socket.emit('start game', 'foo', 'bar');
		this.engine.mode = 'client';
		this.hideMenu();
	}
	else{
		alert('Multiplayer is currently not available.');
	}
};

rules.prototype.startServerGame = function () {
    this.engine.mode = 'server';
    if(this.engine.player1){
    	this.engine.player1.emit('reset', 0);
    }
    if(this.engine.player2){
    	this.engine.player2.emit('reset', 0);
    }
    this.engine.reset();
};

rules.prototype.startZeroPlayerGame = function () {
	this.currentGameType = "startZeroPlayerGame";
    this.engine.mode = 'standalone';
    this.engine.playerCount = 0;
    this.engine.reset();
    this.hideMenu();
};

rules.prototype.showGameOver = function () {
    this.showMenu(gameOverMenu);
};

rules.prototype.showMenu = function (items) {
	return this.menu.show(items);
};

rules.prototype.toggleMenu = function () {
    return this.menu.toggle();
};

rules.prototype.hideMenu = function () {
    return this.menu.hide();
};

rules.prototype.toggleSettings = function () {
    DAT.GUI.toggleHide();
};

rules.prototype.keyboardHandler = function (evt) {
	var evt = evt || window.event;
	var keyCode = evt.keyCode || evt.which;
    // 1: Restart game single player mode, standalone (all runs on the client)
    if (keyCode == 49) {
        this.startSinglePlayerGame();
    }
    // 2: restart game multi player mode, 'client' only renders on the client, game logic runs on the server
    if (keyCode == 50) {
    	this.startMultiPlayerGame();
    }
    // 3: Audio volume down
    if (keyCode == 51) {
        audio.decreaseVolume();
    }
    // 4: Audio volume up
    if (keyCode == 52) {
        audio.increaseVolume();
    }
    // 5: Mute
    if (keyCode == 53) {
        audio.mute();
    }
    // 6: Restart game in zero player mode
    if (keyCode == 54) {
    	this.startZeroPlayerGame();
    }
//    // F8: Toggle settings
//    if (keyCode === 119 || keyCode === 192) {
//        DAT.GUI.toggleHide();
//    }
    // M: Toggle menu
    if (keyCode === 77) {
		this.toggleMenu();
    }
};


if(typeof(exports) !== 'undefined'){
	exports.rules = rules;
}
