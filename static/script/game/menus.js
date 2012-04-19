var mainMenu = {
    '    SINGLE PLAYER': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.rules.startSinglePlayerGame();
        }
    },
    '    MULTI  PLAYER': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.rules.startMultiPlayerGame();
        }
    },
    '':{},
    '    SETTINGS': {
        onMousePlaneUp: function (entity, evt) {
            //entity.engine.rules.toggleSettings();
        	entity.engine.rules.menu.setItems(settingsMenu);
        }
    }//,
    //'CREDITS': {}
};

var settingsMenu = {
	'AUDIO': {
		onMousePlaneUp: function (entity, evt) {
    		if(engine.getItem("effectsVolume",'0') === '0'){
        		engine.effectsVolume = 10;
        	}
        	else{
        		engine.effectsVolume = 0;
        	}
    		// Persist the setting
    		engine.setItem('effectsVolume', engine.effectsVolume);
    		window.audio.setVolume(engine.effectsVolume);
    		// Update the menu (so it now correctly says 2d/3d)
    		entity.engine.rules.menu.setItems(settingsMenu);
        },
        getText: function(menu){
        	var result;
        	if(engine.getItem("effectsVolume",'0') === '0'){
        		result = '      AUDIO: OFF';
        	}
        	else{
        		result = '      AUDIO:  ON';
        	}
        	return result; 
        }
    },
    'VIDEO': {
    	onMousePlaneUp: function (entity, evt) {
    		if(engine.getItem("renderer",'classic') === 'classic'){
    			var webglAvailable = ( function () { 
    				try { 
    					return (!! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' )); 
					} catch( e ) { 
						return false; 
					} 
				} )();
    			if(webglAvailable){
    				engine.renderer = 'webgl';
    			}
    			else{
    				alert('Sorry, 3D is not support by your bowser.');
    			}
        	}
        	else{
        		engine.renderer = 'classic';
        	}
    		// Persist the setting
    		engine.setItem('renderer', engine.renderer);
    		// Update the menu (so it now correctly says 2d/3d)
    		entity.engine.rules.menu.setItems(settingsMenu);
        },
        getText: function(menu){
        	var result;
        	if(engine.getItem("renderer",'classic') === 'classic'){
        		result = '      VIDEO:  2D';
        	}
        	else{
        		result = '      VIDEO:  3D';
        	}
        	return result; 
        }
    },
    '': {},
    '      MAIN MENU': {
        onMousePlaneUp: function (entity, evt) {
            entity.engine.rules.menu.setItems(mainMenu);
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