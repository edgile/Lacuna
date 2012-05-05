function background(config){
	helpers.apply(config, this);
	this.position = this.position || new THREE.Vector2(0,0);
	this.shapes = [{
		type: 'spritebackground', 
		file: 'lacunabackground', 
		sprite: 'background',
		position: this.position,
		scale: 1
	}];
}

background.prototype.update = function(timeLapse){

};