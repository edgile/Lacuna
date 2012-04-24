var level;
var stats;

var timeFactor = 20;
var clock = new THREE.Clock();

function getContext() {
    if (!thisContext) {
        var canvas = document.getElementById("canvas");
        thisContext = canvas.getContext("2d");
    }
    return thisContext;
}

function initialize() {
    var rules = [];
    rules.push(new UpdateRule());
    rules.push(new GravitationRule());
    rules.push(new MotionRule());
    rules.push(new CollisionRule());
    rules.push(new LandingRule());

    level = new Level(rules);
    //level.random();
    level.randomStartsOnly();
    //level.levelOneStar();

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    level.currentSpace.update(delta * timeFactor);
    level.render(getContext());
}