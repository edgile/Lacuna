
Engine.rendering.canvas = function(suspend){
	if(!this.canvasRenderer){
		this.canvasRenderer = new Engine.rendering.canvas.renderer({
			engine: this
		});
	}
	this.canvasRenderer.suspend(suspend);
	if(!this.canvasRenderer.suspended){
		this.canvasRenderer.context.fillStyle = this.backgroundColor;
		this.canvasRenderer.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
		// Render
		var topMost = [];
		for(var i = 0, l = this.entities.length; i < l; i++){
			var e = this.entities[i];
			if(e.hidden){
				// Ignore hidden elements
			}
			else if(e.topMost){
				topMost.push(e);
			}
			else {
				this.canvasRenderer.renderEntity(e);
			}
		}
		for(var i = 0, l = topMost.length; i < l; i++){
			this.canvasRenderer.renderEntity(topMost[i]);
		}
		for(var i = 0, l = this.controllers.length; i < l; i++){
			var controller = this.controllers[i];
			if(controller.render){
				controller.render(this.canvasRenderer.context);
			}
		}
	}
};

// Class for canvas renderer
Engine.rendering.canvas.renderer = function(){

	var drawingFunctions = {
		'line': function(position, config){
			position = config.position || position;
			this.context.strokeStyle = config.color;
			this.context.lineWidth = Math.ceil(config.width * this.scale);
			this.context.beginPath();
			this.context.moveTo(this.fixX(position, config.start), this.fixY(position, config.start));
			this.context.lineTo(this.fixX(position, config.end), this.fixY(position, config.end));
			this.context.stroke();
		},
		'polyline': function(position,config){
		    var points = config.points;
		    position = config.position || position;
		    if (points.points.length > 1) {
		    	this.context.strokeStyle = "white";
		    	this.context.lineWidth = Math.ceil(config.width * this.scale);
		    	this.context.beginPath();
		    	this.context.moveTo( this.fixX(position, points.points[0]), this.fixY(position,  points.points[0]));
			    for (var i = 1, l = points.points.length; i < l; i++) {
			    	this.context.lineTo( this.fixX(position, points.points[i]), this.fixY(position, points.points[i]));
			    }
			    this.context.stroke();
			    this.context.closePath();
		    }
		},
		'arc': function(position, config){
		    if(config.fill){
		    	drawingFunctions.arcFill.apply(this, [position, config]);
		    }
		    else{
		    	drawingFunctions.arcStroke.apply(this, [position, config]);
		    }
		},
		'circle': function(position, config){
			config.start = 0;
			config.end = Math.PI * 2;
			config.close = true;
			drawingFunctions.arc.apply(this, [position, config]);
		},
		'arcStroke': function(position, config){
			this.context.strokeStyle = config.color;
		    this.context.lineWidth = config.width;
		    this.context.beginPath();
		    this.context.arc(this.fixX(position, config.center), this.fixY(position, config.center), config.radius * this.scale, config.start , config.end, config.close);
		    this.context.closePath();
		    this.context.stroke();
		},
		'arcFill': function(position, config){
			this.context.fillStyle = config.color;
			this.context.beginPath();
			this.context.arc(this.fixX(position, config.center), this.fixY(position, config.center), config.radius * this.scale, config.start , config.end, config.close);
			this.context.fill();
			this.context.closePath();
		}
		
	};
	
	var renderer = function(config){
		helpers.apply(config, this);
		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);
		this.canvas.style.position = 'absolute';
		this.canvas.style.backgroundColor = '#000';
		this.canvas.onmousedown = this.onmousedown.bind(this);
		this.canvas.onmouseup = this.onmouseup.bind(this);
		window.onmousemove = this.onmousemove.bind(this);
		window.onresize = this.resize.bind(this);
		this.resize();
	};
	
	renderer.prototype.fixX = function(position, point){
		return ((position.x + point.x) * this.scale) + this.offsetLeft;
	};
	
	renderer.prototype.fixY = function(position, point){
		return ((position.y + point.y) * this.scale) + this.offsetTop;
	};
	
	renderer.prototype.suspend = function(suspend){
		if(this.suspended && !suspend){
			this.canvas.style.display = 'block';
			window.onmousemove = this.onmousemove.bind(this);
			window.onresize = this.resize.bind(this);
			this.resize();
		}
		else if(!this.suspended && suspend){
			this.canvas.style.display = 'none';
		}
		this.suspended = suspend;
	};
	
	renderer.prototype.resize = function(){
		//if(this.suspended) return;
		this.canvas.style.top = '0px';
		this.canvas.style.left = '0px';
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		// Calculate optimum scale
		var scaleh = this.canvas.width / this.engine.width;
		var scalev = this.canvas.height / this.engine.height;
		this.scale = (scaleh < scalev) ? scaleh : scalev;
		this.offsetTop = Math.ceil((this.canvas.height - (this.engine.height * this.scale)) / 2);
		if(this.engine.touchController.touchable && this.offsetTop > 40){
			this.offsetTop = 40;
		}
		this.offsetLeft = Math.ceil((this.canvas.width - (this.engine.width * this.scale)) / 2);
		this.context = this.canvas.getContext('2d');
		for(var i = 0, l = this.engine.controllers.length; i < l; i++){
			var controller = this.engine.controllers[i];
			if(controller.render){
				controller.resize();
			}
		}
	};
	
	renderer.prototype.notify = function(eventName, entities){
		if(entities && eventName){
			for(var i = 0, l = entities.length; i < l; i++ ){
	    		if(entities[i][eventName]){
	    			entities[i][eventName](entities[i], entities[i]);
	    		}
	    	}
		}
	};
	
	renderer.prototype.onmousemove = function(e){
		if(this.suspended) return;
		var evt = e || window.event;
		var newPosition = {
			x: Math.ceil((evt.clientX - this.offsetLeft) / this.scale),
			y: Math.ceil((evt.clientY - this.offsetTop) / this.scale)
		};
		if(!this.engine.touchController.touchable){
			this.engine.mousePosition = newPosition;
			this.engine.absoluteController = true;
		}
		var items = this.engine.entities;
		this.mouseEntities = [];
	    for(var i = 0, l = items.length; i < l; i++){
	    	var item = items[i];
	    	if(item.mousePlane){
	    		item.mousePosition = newPosition;
	    		this.mouseEntities.push(item);
	    	}
	    }
	    this.notify('onmousemove', this.mouseEntities);
	};
	
	renderer.prototype.onmousedown = function(){
		if(this.suspended) return;
		if(!this.engine.touchController.touchable){
			this.engine.buttonDown = true;
		}
		this.notify('onmousedown', this.mouseEntities);
	};
	
	renderer.prototype.onmouseup = function(){
		if(this.suspended) return;
		if(!this.engine.touchController.touchable){
			this.engine.buttonDown = false;
		}
		this.notify('onmouseup', this.mouseEntities);
	};
	
	renderer.prototype.renderEntity = function(e){
		if(this.suspended) return;
		if(e.render){
			e.render();
		}
		if(e.rects) {
			this.drawRects(helpers.ceilPoint({x: e.position.x, y: e.position.y}), e.rects, e.color, true);
		}
		if(e.texts){
			for(var j = 0, l = e.texts.length; j < l; j++ ){
				var t = e.texts[j];
				this.context.font = Math.ceil((t.size || 50) * this.scale) + 'px HeavyDataRegular';
				this.context.textAlign = 'center';
				this.context.fillStyle = t.color;
				this.context.fillText(t.text, Math.ceil(t.position.x * this.scale) + this.offsetLeft, Math.ceil(t.position.y * this.scale) + this.offsetTop);
			}
		}
		if(e.shapes){
			for(var j = 0, l = e.shapes.length; j < l; j++ ){
				var s = e.shapes[j];
				drawingFunctions[s.type].apply(this, [e.position, s]);
			}
		}
	};
	
	renderer.prototype.drawRects = function(offset, rects, color, fill){
		if(rects){
			for(var i = 0, l = rects.length; i < l; i++){
				this.drawRect(offset, rects[i], color, fill);
			}
		}
	};
	
	renderer.prototype.drawRect = function(offset, rect, color, fill){
		if(fill){
			this.context.fillStyle = color;
			this.context.fillRect(
				Math.ceil((rect.x + offset.x) * this.scale) + this.offsetLeft ,
				Math.ceil((rect.y + offset.y) * this.scale) + this.offsetTop  ,
				Math.ceil(rect.w * this.scale) ,
				Math.ceil(rect.h * this.scale) 
			);
		}
		else {
			this.context.strokeStyle = color;
			this.context.strokeRect(
				Math.ceil((rect.x + offset.x) * this.scale) ,
				Math.ceil((rect.y + offset.y) * this.scale) ,
				Math.ceil(rect.w * this.scale) ,
				Math.ceil(rect.h * this.scale) 
			);
		}
	};
	
	return renderer;
}();