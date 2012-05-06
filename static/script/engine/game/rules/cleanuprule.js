/**
Represents a rule that calls removes all finished objects.
@class
@extends RuleBase
*/
function CleanUpRule(config) {
	RuleBase.call(this, config);
};

CleanUpRule.inheritsFrom(RuleBase);

CleanUpRule.prototype.apply = function (spaceObjects, timeLapse) {
    for (var i = spaceObjects.length -1; i >= 0; i--) {
        if(spaceObjects[i].isFinished()){
        	spaceObjects.splice(i, 1);
        }
    }
};

Rules.register('cleanuprule', CleanUpRule);
