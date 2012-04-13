var space;
var stats;

var numberOfPlanets = 0;
var numberOfStars = 4;
var timeLapse = 0.1;

var thisContext;
var mousePos = new THREE.Vector2(0, 0);
var launchPowerTimer;

function initialize() {
    var context = getContext();
    canvasWidth = context.canvas.width;
    canvasHeight = context.canvas.height;

    space = new Space();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    context.canvas.addEventListener('mousedown', onCanvasMouseDown, false);
    context.canvas.addEventListener('click', onCanvasClick, false);

    space.generateBodies(numberOfPlanets, numberOfStars);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    animate();
}

function onCanvasMouseDown(e) {
    space.launchPlatform.start();
}

function onCanvasClick(e) {
    space.launchPlatform.stop();

    space.addShip(space.launchPlatform.getPosition(), space.launchPlatform.getLaunchForceVector());
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

    space.launchPlatform.setPointerLocation(new THREE.Vector2(x, y));
}

function animate() {
    requestAnimationFrame(animate);

    space.calculateNewPositions(timeLapse);

    getContext().clearRect(0, 0, canvasWidth, canvasHeight);
    space.draw(getContext());

    stats.update();
}

function getContext() {
    if (!thisContext) {
        var canvas = document.getElementById("canvas");
        thisContext = canvas.getContext("2d");
    }
    return thisContext;
}
