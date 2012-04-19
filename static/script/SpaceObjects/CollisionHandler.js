function CollisionHandler(object1, object2) {
    this.object1 = object1;
    this.object2 = object2;
}

CollisionHandler.prototype.isCollision = function () {
    return this.object1.collide(this.object2);
}

CollisionHandler.prototype.handle = function () {
    if (!this.isCollision()) return null;

    if (this.object1 instanceof Ship && this.object2 instanceof Ship) {
        this.object1.setStatus(Ship.statusEnum.craching);
        this.object2.setStatus(Ship.statusEnum.craching);
    }
    else if (this.object1 instanceof Ship || this.object2 instanceof Ship) {
        var ship = this.object1 instanceof Ship ? this.object1 : this.object2;
        var spaceObject = this.object1 instanceof Ship ? this.object2 : this.object1;

        ship.setStatus(Ship.statusEnum.craching);
    }
    else {
        return this.mergeSpaceObjects();
    }
}

CollisionHandler.prototype.mergeSpaceObjects = function () {
    var surviver = this.object1.mass > this.object2.mass ? this.object1 : this.object2;
    var victim = this.object1.mass > this.object2.mass ? this.object2 : this.object1;

    surviver.setMass(this.object1.mass + this.object2.mass);
    surviver.setDirection(this.getDirectionAfterCollission(surviver, victim));

    victim.setStatus(victim.statusEnum.finished);

    return new Explosion(victim.getPosition().clone());
}

CollisionHandler.prototype.getDirectionAfterCollission = function (object1, object2) {
    var result = new THREE.Vector2();
    var totalMass = object1.mass + object2.mass;

    result.add(object1.direction.clone().multiplyScalar(object1.mass / totalMass), object2.direction.clone().multiplyScalar(object2.mass / totalMass));

    return result;
}
