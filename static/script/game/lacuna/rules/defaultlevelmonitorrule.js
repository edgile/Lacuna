﻿/**
 * Represents a rule to monitor the flow of a level.
 * @class
 * @extends RuleBase
*/
function DefaultLevelMonitorRule(config) {
	RuleBase.call(this, config);
}

DefaultLevelMonitorRule.inheritsFrom(RuleBase);

/**
 * Applies the rule to the spaceObjects
 * @param {spaceObjects} Array of spaceObjects
 * @param {timeLapse} Time that has passed since the last call.
 */
DefaultLevelMonitorRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects || this.engine.level.status == Level.statusEnum.finished) {
    	return;
    }
    
    var launchPlatform = this.level.getLaunchPlatform();
    if (launchPlatform.shipsLaunched >= launchPlatform.launchCapacity) {
    	launchPlatform.setStatus(SpaceObject.statusEnum.finished);

    	var ships = this.level.getShips();
        if((!ships || ships.length == 0) || DefaultLevelMonitorRule.allShipsLanded(ships)){
        	this.level.status = Level.statusEnum.finished;
        	this.engine.flow.menu.setItems(new levelFinishedMenu({result: this.level.score.getResult()}));
        	this.engine.flow.menu.show();
        }
    }
};

/**
 * Gets a boolean indicating if all ships are landed.
 * @param {ships} Array of ships
 * @returns {boolean} True if any of the ships has the status landed, otherwise false
 */
DefaultLevelMonitorRule.allShipsLanded = function(ships){
	if(ships && ships.length > 0){
		for(var i = 0; i < ships.length; i++){
			if(ships[i].getStatus() != Ship.statusEnum.landed){
				return false;
			}
		}
	}
	return true;
};

Rules.register('defaultlevelmonitorrule', DefaultLevelMonitorRule);

