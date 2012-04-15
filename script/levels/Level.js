var Level = Class.extend({
    name: "Level name",
    world: 1,
    levelNumber: 1,

    initialSpace: null,
    currentSpace: null,
    launchPlatform: new LaunchPlatform(new THREE.Vector2(canvasWidth / 2, canvasHeight - 50)),

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

        this.reset();
    },

    draw: function (context2d) {
        context2d.fillStyle = "white";
        context2d.lineWidth = 1;
        context2d.textBaseline = 'top';
        context2d.font = '20px sans-serif';
        context2d.fillText(this.name, 0, 0);

        if (this.launchPlatform) this.launchPlatform.draw(context2d);
        if (this.currentSpace) this.currentSpace.draw(context2d);
    }
});
