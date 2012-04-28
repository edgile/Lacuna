var menu = function (config) {
    helpers.apply({
        color: '#AAA',
        selectedColor: '#FFF',
        mousePlaneOffset: 250,
        mousePlane: 'z',
        topMost: true,
        onmouseup: this.onmouseup.bind(this),
        layout: 'list'
    }, this);
    helpers.apply(config, this);
    this.setItems(this.mainMenu, this.layout);
};

menu.prototype.gotoRoot = function () {
    this.setItems(this.mainMenu);
};

menu.prototype.onmouseup = function(entity, hit){
	if(!this.hidden){
		if(this.ignoreNextButtonUp){
			this.ignoreNextButtonUp = false;
		}
		else{
			if(this.selected && this.selected.onMousePlaneUp){
				this.selected.onMousePlaneUp(this.selected, this);
			}
		}
	}
};

menu.prototype.setItems = function(items, layout){
	if(this.engine.buttonDown){
		this.ignoreNextButtonUp = true;
	}
	this.currentItems = items;
	this.clear();
	this.shapes = [];
	this.texts = [];
	menu.layout[layout || this.layout || 'list'].createItems.apply(this, [items]);
};

menu.prototype.show = function (items) {
    if (this.hidden) {
        this.hidden = false;
        this.gotoRoot();
    }
    if(items){
    	this.setItems(items);
    }
};

menu.prototype.toggle = function () {
    if (this.hidden) {
        this.hidden = false;
        //this.gotoRoot();
    }
    else {
        this.hidden = true;
    }
};

menu.prototype.hide = function () {
    this.hidden = true;
};

menu.prototype.clear = function(){
	if(this.subEntities){
		for(var i = 0, l = this.subEntities.length; i < l; i++){
			this.subEntities[i].finished = true;
		}
	}
};

menu.prototype.select = function(entity){
	if(this.selected != entity){
		if(this.selected){
			this.selected.color = this.color;
		}
		this.selected = entity;
		if(this.selected){
			this.selected.color = this.selectedColor;
		}
	}
};

menu.prototype.update = function(time){
	if(!this.hidden){
		if(this.mousePosition && this.texts){
			// Calculate item on the same height as the mouse
			var index = menu.layout[this.layout || 'list'].calculateSelectedIndex.apply(this);
			if(index > -1 && index < this.texts.length && this.texts[index].onMousePlaneUp){
				this.select(this.texts[index]);
			    if(this.engine.touchController.touchable){
			    	this.onmouseup(this.texts[index], true);
			    	this.ignoreNextButtonUp = true;
			    }
			}
			else{
				this.select(null);
			}
		}
	}
};

// Layout functions will be bound (this) to the menu
menu.layout = {
		
	list: {
		calculateSelectedIndex: function(){
			return Math.floor( (this.mousePosition.y - (this.engine.height / 3)) / 60 ) + 1;
		},
		createItems: function(items){
			var i = 0;
			for(var s in items){
				var text = s;
				if(items.hasOwnProperty(s)){
					if(items[s].getText){
						text = items[s].getText(this);
					}
					var config = helpers.apply(items[s],{
						font: '50px CBM64',
						size: (items[s].size || 50),
						color: this.color,
						engine: this.engine,
						text: text, 
						position: { 
							x: this.engine.width / 2, 
							y: (this.engine.height / 3) + ( i * 60),
							z: this.mousePlaneOffset
						}
					});
					if(config.submenu){
						var self = this;
						config.onMousePlaneUp = function(entity, hit){
							self.setItems(entity.submenu);
						};
					}
					this.texts.push(config);
					i++;
				}
			}
		}
	},

	horizontalpanels: {
		calculateSelectedIndex: function(){
			return Math.floor( (this.mousePosition.y - (this.engine.height / 3)) / 60 ) + 1;
		},
		createItems: function(items){
			var i = 0;
			for(var s in items){
				var text = s;
				if(items.hasOwnProperty(s)){
					if(items[s].getText){
						text = items[s].getText(this);
					}
					var config = helpers.apply(items[s],{
						font: '50px CBM64',
						size: (items[s].size || 50),
						color: this.color,
						engine: this.engine,
						text: text, 
						position: { 
							x: this.engine.width / 2, 
							y: (this.engine.height / 3) + ( i * 60),
							z: this.mousePlaneOffset
						}
					});
					if(config.submenu){
						var self = this;
						config.onMousePlaneUp = function(entity, hit){
							self.setItems(entity.submenu);
						};
					}
					this.texts.push(config);
					i++;
				}
			}
		}
	}

};

menu.prototype.render = function(time){
	
};

