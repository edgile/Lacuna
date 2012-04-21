soundManager.debugMode = false;
soundManager.preferFlash = true;
soundManager.useHTML5Audio = true;
soundManager.url = 'resources/script/soundmanager/swf/';
soundManager.onready( function() {
	  window.audio = {
		volume				: engine.effectsVolume,
		setVolume			: function(newVolume){
			audio.volume = newVolume;
			for(var s in audio){
				if(audio[s].setVolume){
					audio[s].setVolume(audio.volume);
				}
			}
		},
		decreaseVolume		: function(){
			if(audio.volume > 0){
				audio.volume -= 10;
			}
			audio.setVolume(audio.volume);
		},		
		increaseVolume		: function(){
			if(audio.volume < 100){
				audio.volume += 10;
			}
			audio.setVolume(audio.volume);
		},		
		mute				: function(){
			audio.volume = 0;
			audio.setVolume(audio.volume);
		},
		iOS					: function(){
			return (
					(navigator.userAgent.match(/iPhone/i)) || 
					(navigator.userAgent.match(/iPod/i)) || 
					(navigator.userAgent.match(/iPad/i)) 
			);
		},
		getAudio			: function(id, url){
			var result = !audio.iOS() ? soundManager.createSound({id:id, url:url, volume: engine.effectsVolume}) : null;
			// In some cases it is just not going to work (e.g old IE without flash)
			// createSound will return false.
			if(!result){
				// For now we return a place holder object
				result = {
					play: function(){},
					setVolume: function(){}
				};
			}
			return result;
		}
	};

	audio.explosionAudio 	= audio.getAudio('explosion', 'resources/audio/effects/explosion.mp3');
});



