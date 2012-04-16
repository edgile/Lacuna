var Level = Class.extend({
    name: "Level name",
    world: 0,
    levelNumber: 0,

    initialSpace: null,
    currentSpace: null,
    launchPlatform: new LaunchPlatform(new THREE.Vector2(canvasWidth / 2, canvasHeight - 50)),
    landingZone: new LandingZone(new THREE.Vector2(canvasWidth / 2, 50)),

    init: function () {
        this._className = "Level";
    },

    reset: function () {
        this.currentSpace = this.initialSpace.clone();
    },

    random: function () {
        this.name = "Randomly generated level"

        var numberOfPlanets = Math.floor(Math.random() * 10);
        var numberOfStars = Math.floor(Math.random() * 10);

        this.initialSpace = new Space();
        this.initialSpace.generateSpaceObjects(numberOfPlanets, numberOfStars);
        this.launchPlatform = new LaunchPlatform(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
        this.landingZone = new LaunchZone(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));

        this.reset();
    },

    levelOneStarWithPlanets: function () {
        this.name = "Sun with planets";

        this.initialSpace = new Space();
        var star = new Star();
        star.setPosition(new THREE.Vector2(canvasWidth / 2, canvasHeight / 2));
        star.setDirection(new THREE.Vector2());
        star.setMass(200000);
        this.initialSpace.addSpaceObject(star);

        var planet = new Planet();
        planet.setPosition(new THREE.Vector2(canvasWidth / 2 + 50, canvasHeight / 2));
        planet.setDirection(new THREE.Vector2(0, 350));
        planet.setMass(300);
        this.initialSpace.addSpaceObject(planet);

        planet = new Planet();
        planet.setPosition(new THREE.Vector2(canvasWidth / 2 - 100, canvasHeight / 2));
        planet.setDirection(new THREE.Vector2(0, 400));
        planet.setMass(500);
        this.initialSpace.addSpaceObject(planet);

        this.landingZone = new LaunchZone(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));

        this.reset();
    },

    levelOneStar: function () {
        this.name = "Sun";

        this.initialSpace = new Space();
        var star = new Star();
        star.setPosition(new THREE.Vector2(canvasWidth / 2, canvasHeight / 2));
        star.setMass(200000);
        this.initialSpace.addSpaceObject(star);

        star = new Star();
        star.setPosition(new THREE.Vector2(canvasWidth / 5, 2 * canvasHeight / 3));
        star.setMass(200000);
        this.initialSpace.addSpaceObject(star);

        this.launchPlatform.position.x = canvasWidth / 2;
        this.launchPlatform.position.y = 50;

        this.landingZone = new LandingZone(new THREE.Vector2(Math.random() * canvasWidth, Math.random() * canvasHeight));
        this.landingZone.setDirection(new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1));

        this.reset();
    },

    draw: function (context2d) {
        context2d.fillStyle = "white";
        context2d.lineWidth = 1;
        context2d.textBaseline = 'top';
        context2d.font = '20px sans-serif';
        context2d.fillText(this.name, 0, 0);

        if (this.landingZone) this.landingZone.draw(context2d);
        if (this.launchPlatform) this.launchPlatform.draw(context2d);
        if (this.currentSpace) this.currentSpace.draw(context2d);
    }
});
