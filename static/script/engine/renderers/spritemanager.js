function SpriteManager(config){
	helpers.apply({
		files: [],
		items: {}
	}, this);
	helpers.apply(config, this);
	var self = this;
	this.addFiles(this.files, function(){
		if(self.onload){self.onload(self);};
	});
};

SpriteManager.prototype.addFiles = function(spriteFiles, callback){
	for(var i = 0, l = spriteFiles.length; i < l; i++){
		if(!spriteFiles[i].image){
			var self = this;
			this.addFile(spriteFiles[i], function(newElement){
				self.addFiles(spriteFiles, callback);
			});
			return;
		}
	}
	callback(this);
};

SpriteManager.prototype.addFile = function(spriteFile, callback){
	this.items[spriteFile.name] = spriteFile;
	spriteFile.image = this.load(spriteFile.src, callback);
};

SpriteManager.element = {};
SpriteManager.prototype.load = function(url, loadedCallback){
	var result = null;
	if(!SpriteManager.element[url]){
		SpriteManager.element[url] = result = document.createElement('img');
		if(loadedCallback){
			result.onload = function(){
				result.loadingDone = true;
				loadedCallback(result);	
			};
		}
		// alert(window.innerWidth + ' x ' + window.devicePixelRatio);
		// result.width = 960 * 2;
		result.src = url;
	    result.style.position = 'absolute';
	    result.style.left = "-100000px";
		document.body.appendChild(result);
	}
	else{
		result = SpriteManager.element[url];
		loadedCallback(result);
	}
	return result;
};

SpriteManager.prototype.draw = function(file, sprite, targetContext, position, scale){
	var spriteFile = this.items[file];
	if(spriteFile && spriteFile.image.loadingDone){
		var s =  spriteFile.items[sprite];
		this.setScale(file, scale);
		targetContext.drawImage(spriteFile.scaledImage, s.x * scale, s.y * scale, s.width * scale, s.height * scale, position.x, position.y, s.width * scale, s.height * scale);
	}
};

SpriteManager.prototype.drawBackground = function(file, sprite, targetContext){
	var spriteFile = this.items[file];
	var s = spriteFile.items[sprite];
	if(spriteFile.image.loadingDone){
		if(s.clientWidth !== window.innerWidth || s.clientHeight !== window.innerHeight){
			s.clientWidth = window.innerWidth;
			s.clientHeight = window.innerHeight;
			var scale = window.innerWidth / s.width;
			if(window.innerHeight / s.height > scale){
				scale = window.innerHeight / s.height;
			}
			this.setScale(file, scale);	
		}
		targetContext.drawImage(spriteFile.scaledImage, 0, 0, window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight);
	}
};

SpriteManager.prototype.setScale = function(file, scale){
	var spriteFile = this.items[file];
	var result = false;
	if(spriteFile && spriteFile.scale !== scale && spriteFile.image.loadingDone === true){
		spriteFile.scale = scale;
		if(spriteFile.scaledImage){
			document.body.removeChild(spriteFile.scaledImage);
		}
		var image = spriteFile.scaledImage = document.createElement('canvas');
		image.width = Math.ceil(spriteFile.width * scale);
		image.height = Math.ceil(spriteFile.height * scale);
		document.body.appendChild(image);
		var context = image.getContext('2d');
		context.drawImage(spriteFile.image, 0, 0, spriteFile.width, spriteFile.height, 0, 0, spriteFile.width * scale, spriteFile.height * scale);
		result = true;
	}
	return result;
};