var level;
var stats;

var timeLapse = 1;

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

    level = new Level();
    level.random();

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
    level.launchPlatform.start();
}

function onCanvasClick(e) {
    level.launchPlatform.stop();

    level.currentSpace.addShip(level.launchPlatform.getPosition(), level.launchPlatform.getLaunchForceVector());
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

    level.launchPlatform.setPointerLocation(new THREE.Vector2(x, y));
}

function animate() {
    requestAnimationFrame(animate);

    level.currentSpace.calculateNewPositions(timeLapse);

    getContext().clearRect(0, 0, canvasWidth, canvasHeight);
    level.draw(getContext());

    stats.update();
}