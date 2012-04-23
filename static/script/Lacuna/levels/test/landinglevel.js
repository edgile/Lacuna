var LandingLevel = function () {
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
    launchPlatform.setPosition(new THREE.Vector2(canvasWidth / 2, canvasHeight - 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone();
    landingZone.setPosition(new THREE.Vector2(canvasWidth / 2, 50));
    landingZone.setDirection(new THREE.Vector2(1, 0));
    result.push(landingZone);

    return result;
}

Levels.register("landinglevel", LandingLevel);