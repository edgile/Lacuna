/*
 *   Basic entity
 */
if(typeof(require) !== 'undefined'){
	var helpers = require("./helpers").helpers;
	var sys = require("sys");
}

var entity = function(config){
};

entity.prototype.render = function(){
};

entity.prototype.update = function(time){
};

if(typeof(exports) !== 'undefined'){
	exports.entity = entity;
}
