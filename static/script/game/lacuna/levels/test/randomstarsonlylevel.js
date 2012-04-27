﻿var RandomStarsOnlyLevel = function (config) {
    var defaultConfig = 
        {
            id: "randomstarslevel",
            gameId: Constants.gameId,
            name: "Randomly generated level (only stars)",
            world: 0,
            level: 0,
            rules: Constants.defaultRules
        };

    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);

    this.spaceObjects = this.getSpaceObjects();
};

RandomStarsOnlyLevel.inheritsFrom(LacunaLevel);

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
};

Levels.register(Constants.gameId, "randomstarslevel", RandomStarsOnlyLevel);