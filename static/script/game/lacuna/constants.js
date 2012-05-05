Constants = {
    gameId: "lacuna",
	name: "Lacuna",
	gameWidth: 800,
    gameHeight: 600,
	
	getDefaultRules: function(){
		return [{type: 'updaterule'}, 
	               {type: 'gravitationrule'}, 
	               {type: 'motionrule'}, 
	               {type: 'collisionrule'}, 
	               {type: 'landingrule'}, 
	               {type: 'flighttimerule', maxFlightTime: 200}, 
	               {type: 'defaultlevelmonitorrule'}, 
	               {type: 'cleanuprule'}];
	}
};