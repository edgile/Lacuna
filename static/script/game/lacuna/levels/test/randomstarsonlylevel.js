var RandomStarsOnlyLevel = function (config) {
	LacunaLevel.call(this, config);

	var defaultConfig = 
        {
            world: 0,
            level: 0,
            rules: Constants.getDefaultRules(this.getRuleConfig(config))
        };

    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);

    this.spaceObjects = this.getSpaceObjects();
};

RandomStarsOnlyLevel.inheritsFrom(LacunaLevel);

RandomStarsOnlyLevel.id = "randomstarslevel";
RandomStarsOnlyLevel.gameId = Constants.gameId;
RandomStarsOnlyLevel.title = "Randomly generated level (only stars)";

RandomStarsOnlyLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var numberOfStars = Math.floor(Math.random() * 10);

    var launchPlatform = new LaunchPlatform({engine: this.engine});
    launchPlatform.setPosition(new THREE.Vector2(this.engine.width / 2, 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone({engine: this.engine});
    landingZone.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
    landingZone.setDirection(new THREE.Vector2(1, 0));
    result.push(landingZone);

    for (var i = 1; i <= numberOfStars; i++) {
        var star = new Star({engine: this.engine});
        star.setRandomValues();
        result.push(star);
    }

    return result;
};

Levels.register(Constants.gameId, RandomStarsOnlyLevel.id, RandomStarsOnlyLevel);