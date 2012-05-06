var mainMenu = {
    'LACUNA': {
    	size: 200
    },
    '':{},
    'Start Game': {
        onMousePlaneUp: function (entity, evt) {
        	var levels = Levels.getGameLevels(Constants.gameId);
        	var menuItems = {};
        	for (var s in levels){
        		if(levels.hasOwnProperty(s)){
	        		menuItems[levels[s].title] = {
	        			gameId: s,
	    		        onMousePlaneUp: function (item, evt) {        	
	    		        	entity.engine.flow.start(item.gameId);
	    		        }
	        		};
        		}
        	}
        	menuItems[''] = {};
            menuItems['MAIN MENU'] = {
                onMousePlaneUp: function (entity, evt) {
                    entity.engine.flow.menu.setItems(mainMenu);
                }
            };
        	entity.engine.flow.menu.setItems(menuItems);
        }
    },
    'SETTINGS': {
        onMousePlaneUp: function (entity, evt) {        	
        	entity.engine.flow.menu.setItems(settingsMenu);
        }
    }
};

var settingsMenu = {
    'AUDIO': {
        onMousePlaneUp: function (entity, evt) {
            if (Engine.getItem("effectsVolume", '0') === '0') {
                Engine.effectsVolume = 10;
            }
            else {
                Engine.effectsVolume = 0;
            }
            // Persist the setting
            Engine.setItem('effectsVolume', Engine.effectsVolume);
            window.audio.setVolume(Engine.effectsVolume);
            // Update the menu (so it now correctly says 2d/3d)
            entity.engine.flow.menu.setItems(settingsMenu);
        },
        getText: function (menu) {
            var result;
            if (Engine.getItem("effectsVolume", '0') === '0') {
                result = 'AUDIO: OFF';
            }
            else {
                result = 'AUDIO: ON';
            }
            return result;
        }
    },
    'VIDEO': {
        onMousePlaneUp: function (entity, evt) {
            if (Engine.getItem("renderer", 'canvas') === 'canvas') {
                var webglAvailable = (function () {
                    try {
                        return (!!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'));
                    } catch (e) {
                        return false;
                    }
                })();
                if (webglAvailable) {
                    Engine.renderer = 'webgl';
                }
                else {
                    alert('Sorry, 3D is not support by your bowser.');
                }
            }
            else {
                Engine.renderer = 'canvas';
            }
            // Persist the setting
            Engine.setItem('renderer', Engine.renderer);
            // Update the menu (so it now correctly says 2d/3d)
            entity.engine.flow.menu.setItems(settingsMenu);
        },
        getText: function (menu) {
            var result;
            if (Engine.getItem("renderer", 'canvas') === 'canvas') {
                result = 'VIDEO: 2D';
            }
            else {
                result = 'VIDEO: 3D';
            }
            return result;
        }
    },
    'RESET': {
        onMousePlaneUp: function (entity, evt) {
            alert('Remove all saved data ...');
        }
    },
    '': {},
    'MAIN MENU': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.flow.menu.setItems(mainMenu);
        }
    }
};

var levelFinishedMenu = function(config) {
	var result = {};
	result[config.result.text] = {};
	result[''] = {};
	result['RETRY'] = {
	        onMousePlaneUp: function (entity, evt) {
	        	entity.engine.flow.menu.hide();
	        	entity.engine.flow.start(entity.engine.level.levelId);
	        }
	    };
	if(config.result.passed){
		result['NEXT'] = {
		        onMousePlaneUp: function (entity, evt) {
		        	alert("TODO: Implementation ...");
		        }
		    };
	}
	result['SELECT LEVEL'] = {
	        onMousePlaneUp: function (entity, evt) {
	        	alert("TODO: Implementation ...");
	        }
	    };
	result[''] = {};
	result['MAIN MENU'] = {
	        onMousePlaneUp: function (entity, evt) {
	            entity.engine.flow.menu.setItems(mainMenu);
	        }
	    }; 
	
	return result;
};