var LandingLevel = function (config) {
	helpers.apply(this, config);
    var result = new Level(
        {
            identifier: "landinglevel",
            name: "Landing",
            world: 0,
            level: 0,
            space: new Space({ spaceObjects: this.getSpaceObjects(), rules: Space.getDefaultRules() })
        }
    );

    return result;
};

LandingLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var launchPlatform = new LaunchPlatform();
    launchPlatform.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone();
    landingZone.setPosition(new THREE.Vector2(this.engine.width / 2, 50));
    landingZone.setDirection(new THREE.Vector2(1, 0));
    result.push(landingZone);

    return result;
};

Levels.register("landinglevel", LandingLevel);