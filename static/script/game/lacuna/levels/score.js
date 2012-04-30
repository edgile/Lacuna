/**
 * Score object keeps track of the score for the level.
 * @param config
 * @class
 */
function Score(config){
	helpers.apply(config, this);
	
	this.totalPoints = 0;
	this.shipsLanded = 0;
	this.initialized = false;
};

/**
 * Initializes the Score object
 * @function
 * @private
 */
Score.prototype.initialize = function(){
	if(!this.initialized) {
		this.scoreBar = this.level.engine.flow.scoreBar;
		if(!this.scoreBar.hasItem("totalscore")){
			this.scoreBar.addScoreBarItem("totalscore", "Total: 0", "white", 10);
		}
		if(!this.scoreBar.hasItem("shipslanded")){
			this.scoreBar.addScoreBarItem("shipslanded", "Landed: 0", "white", 200);
		}
		this.scoreBar.setScore("totalscore", this.totalPoints);
		this.scoreBar.setScore("shipslanded", "Landed: " + this.shipsLanded);
		this.initialized = true;
	}
};

Score.prototype.shipLanded = function(){
	this.shipsLanded += 1;
	if(this.scoreBar){
		this.scoreBar.setScore("shipslanded", "Landed:" + Math.floor(this.shipsLanded));
	}
};

Score.prototype.addPoints = function(amount){
	this.initialize();
	
	this.totalPoints += amount;
	if(this.scoreBar){
		this.scoreBar.setScore("totalscore", "" + Math.floor(this.totalPoints));
	}
};