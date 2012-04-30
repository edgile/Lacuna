Constants = {
	gameId: "lacuna",
	name: "Lacuna",
	
	getDefaultRules: function(config){
		if(!config.aiMode){
			return [new UpdateRule(config), 
		               new GravitationRule(config), 
		               new MotionRule(config), 
		               new CollisionRule(config), 
		               new LandingRule(config), 
		               new FlightTimeRule(config),
		               new DefaultLevelMonitorRule(config)]
		}else{
			return [new UpdateRule(config), 
		               new GravitationRule(config), 
		               new MotionRule(config), 
		               new CollisionRule(config), 
		               new LandingRule(config), 
		               new FlightTimeRule(config)]
		}
	}
};