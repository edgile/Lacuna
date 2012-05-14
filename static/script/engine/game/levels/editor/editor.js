/**
    Editor engine
    @class
*/
function Editor(config){
	// Process config
	helpers.apply(config, this);

	//this.initializeControllers();
	//this.animate();

	this.test();
	this.list();
};

Editor.prototype.list = function () {
};

Editor.prototype.test = function () {
    var text = SpaceObject.defaultConfig;

    var gui = new dat.GUI();

    gui.add(text, 'type');
    gui.add(text, 'name');
    gui.add(text, 'density');
    gui.add(text, 'mass');
    gui.add(text, 'static');
    gui.add(text, 'canCollide');
    gui.add(text, 'influencesGravitationalField');
    gui.add(text, 'influencedByGravity');

    var folder1 = gui.addFolder('Position');
    folder1.add(text.position, 'x');
    folder1.add(text.position, 'y');
    folder1.open();

    var folder2 = gui.addFolder('Direction');
    folder2.add(text.direction, 'x');
    folder2.add(text.direction, 'y');
    folder2.open();
};

/**
Starts the main animation loop, should not be called directly.
@function
@private
*/
Editor.prototype.animate = function () {
    requestAnimationFrame(this.animate.bind(this));

    Engine.rendering[this.renderer].apply(this);
};

/**
Initializes the controllers, should not be called directly.
@function
@private
*/
Editor.prototype.initializeControllers = function () {
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
Editor.rendering = {};

/**
Registration point for games.
@field
@public
@static
@type Object
*/
Editor.games = {};

/**
Stores a value in local storage. Will handle objects, will probably fail when called on the server.
@function
@public
@static
@type Object
*/
Editor.setItem = function (key, value) {
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
Editor.getItem = function (key, defaultValue) {
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