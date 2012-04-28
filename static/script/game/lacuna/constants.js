Constants = {
	gameId: "lacuna",
	name: "Lacuna",
	
	getDefaultRules: function(config){
		return [new UpdateRule(config), 
	               new GravitationRule(config), 
	               new MotionRule(config), 
	               new CollisionRule(config), 
	               new LandingRule(config), 
	               new DefaultLevelMonitorRule(config)]
	}
};