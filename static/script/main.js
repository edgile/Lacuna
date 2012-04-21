var level;
var stats;

var timeFactor = 20;
var clock = new THREE.Clock();
var thisContext;
var mousePos = new THREE.Vector2(0, 0);

function getContext() {
    if (!thisContext) {
        var canvas = document.getElementById("canvas");
        thisContext = canvas.getContext("2d");
    }
    return thisContext;
}

function initialize() {
    var context = getContext();
    canvasWidth = context.canvas.width;
    canvasHeight = context.canvas.height;

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

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    context.canvas.addEventListener('mousedown', onCanvasMouseDown, false);
    context.canvas.addEventListener('click', onCanvasClick, false);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    animate();
}

function onCanvasMouseDown(e) {
    level.getLaunchPlatform().start();
}

function onCanvasClick(e) {
    level.getLaunchPlatform().stop();

    addShip(level.getLaunchPlatform().getPosition().clone(), level.getLaunchPlatform().getLaunchForceVector().clone());
}

function addShip(position, direction) {
    var s = new Ship();
    s.setPosition(position);
    s.setDirection(direction);

    level.currentSpace.addSpaceObject(s);
}

function onDocumentMouseMove(e) {
    var x;
    var y;

    if (e.pageX || e.pageY) {
        x = e.pageX; y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    }
    var context = getContext();
    x -= context.canvas.offsetLeft;
    y -= context.canvas.offsetTop;

    level.getLaunchPlatform().setPointerLocation(new THREE.Vector2(x, y));
}

function animate() {
    requestAnimationFrame(animate);

    var delta = clock.getDelta();
    level.currentSpace.update(delta * timeFactor);

    getContext().clearRect(0, 0, canvasWidth, canvasHeight);
    level.render(getContext());

    stats.update();
}