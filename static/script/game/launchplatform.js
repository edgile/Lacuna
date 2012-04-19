/*
 *   LaunchPlatform
 */
if(typeof(require) !== 'undefined'){
	var helpers = require("./helpers").helpers;
	var entity = require("./entity").entity;
	var colors;
}

var LaunchPlatform = function(config){
	helpers.apply(config, this);
	this.type = 'launchplatform';
	this.position = this.position || {x:0, y:0};
	this.angle = this.angle || 0;
	this.modelIndex = 1;
	this.rects = [
		{x: -10, y: -20, w: 20, h: 10},
		{x: -20, y: -10, w: 40, h: 10},
		{x: -20, y: 0, w: 40, h: 10},
		{x: -10, y: 10, w: 20, h: 10}
	];
};

LaunchPlatform.prototype = new entity();

LaunchPlatform.prototype.render = function(){
	if(this.makeSound){
		audio.changeColorAudio.play();
		this.makeSound = false;
	}
	this.classicModel = this.rects;
};

LaunchPlatform.prototype.update = function(time){
	if(this.engine.mode !== 'client'){
	}
};

LaunchPlatform.prototype.getRemoteData = function(){
	var result = null;
	return result;
};

LaunchPlatform.prototype.renderRemoteData = function(remoteData, offset){
	
};

if(typeof(exports) !== 'undefined'){
	exports.LaunchPlatform = LaunchPlatform;
}