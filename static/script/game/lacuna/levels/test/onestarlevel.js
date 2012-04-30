﻿var OneStarLevel = function (config) {
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

OneStarLevel.inheritsFrom(LacunaLevel);

OneStarLevel.id = "onestarlevel";
OneStarLevel.gameId = Constants.gameId;
OneStarLevel.title = "One star level";

OneStarLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var launchPlatform = new LaunchPlatform({engine: this.engine});
    launchPlatform.setPosition(new THREE.Vector2(this.engine.width / 2, 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone({engine: this.engine});
    landingZone.setPosition(new THREE.Vector2(Math.random() * this.engine.width, Math.random() * this.engine.height));
    landingZone.setDirection(new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1));
    result.push(landingZone);

    var star = new Star({engine: this.engine});
    star.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height / 2));
    star.setMass(200000);
    result.push(star);

    return result;
};

Levels.register(Constants.gameId, OneStarLevel.id, OneStarLevel);