/**
 * Represents a rule to calculate the change in position over time.
 * @class
 * @extends RuleBase
*/
function MotionRule(config) {
	RuleBase.call(this, config);
}

MotionRule.inheritsFrom(RuleBase);

/**
 * Applies the rule to the spaceObjects
 * @param {spaceObjects} Array of spaceObjects
 * @param {timeLapse} Time that has passed since the last call.
 * @returns Array of spaceObjects
 */
MotionRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var timeInSeconds = timeLapse / 1000;

    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var object = spaceObjects[i];
        if (!object.static) {
            var movement = object.direction.clone().multiplyScalar(timeInSeconds);
            object.setPosition(object.getPosition().addSelf(movement));
        }
    }
};
