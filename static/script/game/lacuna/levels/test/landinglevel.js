var LandingLevel = function (config) {
	var defaultConfig = 
        {
            id: "landinglevel",
            gameId: Constants.gameId,
            name: "Landing",
            world: 0,
            level: 0,
            rules: Constants.defaultRules
        };
    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);
    
    this.spaceObjects = this.getSpaceObjects();
};

LandingLevel.inheritsFrom(LacunaLevel);

LandingLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var launchPlatform = new LaunchPlatform({engine: this.engine});
    launchPlatform.setPosition(new THREE.Vector2(this.engine.width / 2, this.engine.height - 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone({engine: this.engine});
    landingZone.setPosition(new THREE.Vector2(this.engine.width / 2, 50));
    landingZone.setDirection(new THREE.Vector2(1, 0));
    result.push(landingZone);

    return result;
};

LandingLevel.title = "Landing level";

Levels.register(Constants.gameId, "landinglevel", LandingLevel);