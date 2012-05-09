/**
    Editor engine
    @class
*/
function Engine(config){
	// Defaults
	helpers.apply({
		level: null,
		timeFactor : 20,
		clock: new THREE.Clock(),
		width: Lacuna.gameWidth,
		height: Lacuna.gameHeight,
		renderer: "canvas",
		backgroundColor: '#000',
        mode: 'editor',
		mousePosition: new THREE.Vector2(0,0)
	}, this);
	// Process config
	helpers.apply(config, this);
	this.initializeControllers();
	this.level = new Level();
	this.animate();
};


/**
Starts the main animation loop, should not be called directly.
@function
@private
*/
Engine.prototype.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    var delta = this.clock.getDelta();
    this.entities = this.level.spaceObjects;
    Engine.rendering[this.renderer].apply(this);
};

/**
Initializes the controllers, should not be called directly.
@function
@private
*/
Engine.prototype.initializeControllers = function(){
	// Currently the system just support two controllers, this should be turned into an array
	this.buttonDown = false;
	this.mousePosition = {x: 0, y: 0};
	this.buttonDown2 = false;
	this.mousePosition2 = {x: 0, y: 0};
	this.controllers = [];
	// Initialize the actual controllers
	this.touchController = new touchController({engine: this});
	this.controllers.push( this.touchController );
	this.mouseController = new mouseController({engine: this});
	this.controllers.push( this.mouseController );
	this.keyboardController = new keyboardController({engine: this});
	this.controllers.push( this.keyboardController );
};

/**
Registration point for rendering.
@field
@public
@static
@type Object
*/
Engine.rendering = {};

/**
Registration point for games.
@field
@public
@static
@type Object
*/
Engine.games = {};

/**
Stores a value in local storage. Will handle objects, will probably fail when called on the server.
@function
@public
@static
@type Object
*/
Engine.setItem = function(key, value) {
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
};

/**
Gets an object from local storage, if no value for key was found defaultValue is returned;
@function
@public
@static
@type Object
*/
Engine.getItem = function(key, defaultValue) {
    var result = null;
    if(typeof localStorage != 'undefined'){
		result = localStorage.getItem(key);
	    // assume it is an object that has been stringified
	    if (result && result[0] == "{") {
	        result = JSON.parse(result);
	    }
    }
    return result || defaultValue;
};