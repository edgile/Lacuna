/**
 * Represents a rule to calculate and handle collisions.
 * @class
 * @extends RuleBase
*/
function CollisionRule(config) {
	RuleBase.call(this, config);
}

CollisionRule.inheritsFrom(RuleBase);

CollisionRule.prototype.apply = function (spaceObjects, timeLapse) {
    var newObjects = [];
    for (var i = 0; i < spaceObjects.length; i++) {
        for (var j = i + 1; j < spaceObjects.length; j++) {
            var result = this.applyRule(spaceObjects[i], spaceObjects[j]);
            if (result) {
                newObjects.push(result);
            }
        }
    }
    return newObjects;
};

CollisionRule.prototype.isCollision = function (object1, object2) {
    if (!object1.canCollide || !object2.canCollide) return false;
    if (object1.isFinished() || object2.isFinished()) return false;

    return object1.getDistance(object2) < (object1.getRadius() + object2.getRadius());
};

CollisionRule.prototype.applyRule = function (object1, object2) {
    if (!this.isCollision(object1, object2)) return null;

    if (object1 instanceof Ship && object2 instanceof Ship) {
        object1.setStatus(Ship.statusEnum.crashing);
        object2.setStatus(Ship.statusEnum.crashing);
    }
    else if (object1 instanceof Reward || object2 instanceof Reward) {
        var reward = object1 instanceof Reward ? object1 : object2;
        reward.setStatus(SpaceObject.statusEnum.finished);
        if (object1 instanceof Ship || object2 instanceof Ship) {
            this.level.score.addPoints(reward.points);
            return new TextSpaceObject({ text: reward.points, displayTime: 25, position: reward.getPosition().clone(), direction: new THREE.Vector2(0, 0) });
        }
    }
    else if (object1 instanceof Ship || object2 instanceof Ship) {
        var ship = object1 instanceof Ship ? object1 : object2;
        var spaceObject = object1 instanceof Ship ? object2 : object1;

        ship.setStatus(Ship.statusEnum.crashing);
    }
    else {
        return this.mergeSpaceObjects(object1, object2);
    }
};

CollisionRule.prototype.mergeSpaceObjects = function (object1, object2) {
    var surviver = object1.mass > object2.mass ? object1 : object2;
    var victim = object1.mass > object2.mass ? object2 : object1;

    surviver.setMass(object1.mass + object2.mass);
    surviver.setDirection(this.getDirectionAfterCollission(surviver, victim));

    victim.setStatus(SpaceObject.statusEnum.finished);

    return new Explosion({position: victim.getPosition().clone(), direction:victim.getDirection().clone()});
};

CollisionRule.prototype.getDirectionAfterCollission = function (object1, object2) {
    var result = new THREE.Vector2();
    var totalMass = object1.mass + object2.mass;

    result.add(object1.direction.clone().multiplyScalar(object1.mass / totalMass), object2.direction.clone().multiplyScalar(object2.mass / totalMass));

    return result;
};

Rules.register('collisionrule', CollisionRule);
