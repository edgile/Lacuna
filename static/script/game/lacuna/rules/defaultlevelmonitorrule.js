/**
 * Represents a rule to monitor the flow of a level.
 * @class
 * @extends RuleBase
*/
function DefaultLevelMonitorRule(config) {
	helpers.apply(config, this);
}

DefaultLevelMonitorRule.inheritsFrom(RuleBase);

/**
 * Applies the rule to the spaceObjects
 * @param {spaceObjects} Array of spaceObjects
 * @param {timeLapse} Time that has passed since the last call.
 */
DefaultLevelMonitorRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;
    if(this.engine.level.status == Level.statusEnum.finished) return;

    var ships = this.engine.level.getShips();
    if(ships.length > 0 && DefaultLevelMonitorRule.anyShipLanded(ships)){
    	this.engine.level.status = Level.statusEnum.finished;
    	this.engine.flow.menu.setItems(levelFinishedMenu);
    	this.engine.flow.menu.show();
    }
};

/**
 * Gets if any of the ships has landed
 * @param {ships} Array of ships
 * @returns {boolean} True if any of the ships has the status landed, otherwise false
 */
DefaultLevelMonitorRule.anyShipLanded = function(ships){
	if(ships && ships.length > 0){
		for(var i = 0; i < ships.length; i++){
			if(ships[i].getStatus() == Ship.statusEnum.landed){
				return true;
			}
		}
	}
	return false;
};
