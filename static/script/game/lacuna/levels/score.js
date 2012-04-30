/**
 * Score object keeps track of the score for the level.
 * @param config
 * @class
 */
function Score(config){
	helpers.apply(config, this);
	
	this.flightTimeScore = 0;
	this.shipsLanded = 0;
};