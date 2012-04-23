var OneStarLevel = function () {
    var result = new Level(
        {
            identifier: "onestarlevel",
            name: "One star",
            world: 0,
            level: 0,
            space: new Space({ spaceObjects: this.getSpaceObjects(), rules: Space.getDefaultRules() })
        }
    );

    return result;
};

OneStarLevel.prototype.getSpaceObjects = function () {
    var result = [];

    var launchPlatform = new LaunchPlatform();
    launchPlatform.setPosition(new THREE.Vector2(canvasWidth / 2, 50));
    result.push(launchPlatform);

    var landingZone = new LandingZone();
    landingZone.setPosition(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
    landingZone.setDirection(new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1));
    result.push(landingZone);

    var star = new Star();
    star.setPosition(new THREE.Vector2(canvasWidth / 2, canvasHeight / 2));
    star.setMass(200000);
    result.push(star);

    return result;
}

Levels.register("onestarlevel", OneStarLevel);