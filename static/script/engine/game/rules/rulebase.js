/**
Base class for rules.
@class
*/
var RuleBase = function (config) {
	helpers.apply(config, this);
};

/**
Applies the rule on the given set of objects.
@method
@param {positionedItem[]} objects - Array of objects that the rule has to be applied against.
@param {number} timeLapse - Time passed since last call.
*/
RuleBase.prototype.apply = function (objects, timeLapse) {
};