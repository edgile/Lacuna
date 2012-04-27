var mainMenu = {
    'LACUNA': {
    	size: 200
    },
    '':{},
    'Start Game': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.flow.start();
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
    		if(Engine.getItem("effectsVolume",'0') === '0'){
        		Engine.effectsVolume = 10;
        	}
        	else{
        		Engine.effectsVolume = 0;
        	}
    		// Persist the setting
    		Engine.setItem('effectsVolume', Engine.effectsVolume);
    		window.audio.setVolume(Engine.effectsVolume);
    		// Update the menu (so it now correctly says 2d/3d)
    		entity.engine.flow.menu.setItems(settingsMenu);
        },
        getText: function(menu){
        	var result;
        	if(Engine.getItem("effectsVolume",'0') === '0'){
        		result = 'AUDIO: OFF';
        	}
        	else{
        		result = 'AUDIO: ON';
        	}
        	return result; 
        }
    },
    'VIDEO': {
    	onMousePlaneUp: function (entity, evt) {
    		if(Engine.getItem("renderer",'canvas') === 'canvas'){
    			var webglAvailable = ( function () { 
    				try { 
    					return (!! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' )); 
					} catch( e ) { 
						return false; 
					} 
				} )();
    			if(webglAvailable){
    				Engine.renderer = 'webgl';
    			}
    			else{
    				alert('Sorry, 3D is not support by your bowser.');
    			}
        	}
        	else{
        		Engine.renderer = 'canvas';
        	}
    		// Persist the setting
    		Engine.setItem('renderer', Engine.renderer);
    		// Update the menu (so it now correctly says 2d/3d)
    		entity.engine.flow.menu.setItems(settingsMenu);
        },
        getText: function(menu){
        	var result;
        	if(Engine.getItem("renderer",'canvas') === 'canvas'){
        		result = 'VIDEO: 2D';
        	}
        	else{
        		result = 'VIDEO: 3D';
        	}
        	return result; 
        }
    },
    '': {},
    'MAIN MENU': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.flow.menu.setItems(mainMenu);
        }
    }
};

var gameOverMenu = {
    '      GAME OVER': {},
    '': {},
    '      PLAY AGAIN': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.rules[entity.engine.rules.currentGameType]();
        }
    },
    '      MAIN MENU': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.rules.menu.setItems(mainMenu);
        }
    }
};