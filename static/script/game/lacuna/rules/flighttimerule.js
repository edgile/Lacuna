/**
 * Monitors the flight time of ships and takes action when the time is exceeded
 * @class
 */
function FlightTimeRule(config){
	RuleBase.call(this, config);
	
	if(!this.maxFlightTime) this.maxFlightTime = 30 * this.engine.timeFactor;
}

FlightTimeRule.inheritsFrom(RuleBase);

/**
 * Applies the rule to the spaceObjects
 * @param {spaceObjects} Array of spaceObjects
 * @param {timeLapse} Time that has passed since the last call.
 */
FlightTimeRule.prototype.apply = function (spaceObjects, timeLapse) {
    var ships = this.engine.level.getShips();
    if(ships){
	    for(var i = 0, numberOfShips = ships.length; i < numberOfShips; i++){
	    	var ship = ships[i];
	    	if(ship.status == Ship.statusEnum.flying){
		    	if(!ship.flightTime){
		    		ship.flightTime = timeLapse;
		    	}else{
		    		ship.flightTime += timeLapse;
		    	}
		    	this.engine.level.score.addPoints(10 * timeLapse / this.engine.timeFactor);
		    	if(ship.flightTime > this.maxFlightTime){
		    		ship.setStatus(Ship.statusEnum.crashing);
		    	}
	    	}
	    }
    }
};