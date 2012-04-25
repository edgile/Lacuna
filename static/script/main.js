function Engine(config){
	// Defaults
	helpers.apply({
		level: null,
		timeFactor : 20,
		clock: new THREE.Clock(),
		width : 800,
		height : 600,
		renderer: "canvas",
		backgroundColor: '#000',
		mousePosition: new THREE.Vector2(0,0)
	}, this);
	// Process config
	helpers.apply(config, this);
	if(this.showStats){
		this.createStats();
	}
	this.initializeControllers();
	this.level = Levels.load({
		name: this.levelName || 'onestarlevel',
		engine: this
	});
	this.animate();
}

Engine.prototype.createStats = function(){
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);
};


Engine.prototype.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    var delta = this.clock.getDelta();
    this.level.space.update(delta * this.timeFactor);
    this.entities = this.level.space.spaceObjects;
    Engine.rendering[this.renderer].apply(this);
    if(this.showStats){
    	this.stats.update();
    }
};

Engine.prototype.initializeControllers = function(){
	this.buttonDown = false;
	this.mousePosition = {x: 0, y: 0};
	this.buttonDown2 = false;
	this.mousePosition2 = {x: 0, y: 0};
	this.controllers = [];
	this.touchController = new touchController({engine: this});
	this.controllers.push( this.touchController );
	this.mouseController = new mouseController({engine: this});
	this.controllers.push( this.mouseController );
	this.keyboardController = new keyboardController({engine: this});
	this.controllers.push( this.keyboardController );
};

// Registration point for rendering
Engine.rendering = {};