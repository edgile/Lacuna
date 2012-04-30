var LandingLevel = function (config) {
	LacunaLevel.call(this, config);
	
	var defaultConfig = 
        {
            world: 0,
            level: 0,
            scoreRequirements: {totalPoints: {bronze: 100, silver: 200, gold: 300}, shipsLanded: {bronze: 1, silver: 2, gold: 3}},
            rules: Constants.getDefaultRules(this.getRuleConfig(config))
        };
    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);
    
    this.spaceObjects = this.getSpaceObjects();
};

LandingLevel.inheritsFrom(LacunaLevel);

LandingLevel.id = "landinglevel";
LandingLevel.gameId = Constants.gameId;
LandingLevel.title = "Landing level";

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

Levels.register(Constants.gameId, LandingLevel.id, LandingLevel);