var RandomStarsOnlyLevel = function (config) {
	helpers.apply(this, config);
    var result = new Level(
        {
            identifier: "randomstarslevel",
            name: "Randomly generated level (only stars)",
            world: 0,
            level: 0,
            space: new Space({spaceObjects: this.getSpaceObjects(), rules: Space.getDefaultRules() })
        }
    );

    return result;
};

RandomStarsOnlyLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var numberOfStars = Math.floor(Math.random() * 10);

    var launchPlatform = new LaunchPlatform();
    launchPlatform.setPosition(new THREE.Vector2(this.engine.width / 2, 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
    landingZone.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
    landingZone.setDirection(new THREE.Vector2(1, 0));
    result.push(landingZone);

    for (var i = 1; i <= numberOfStars; i++) {
        var star = new Star();
        star.setRandomValues();
        result.push(star);
    }

    return result;
}

Levels.register("randomstarsonlylevel", RandomStarsOnlyLevel);