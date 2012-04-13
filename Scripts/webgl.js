var numberOfPlanets = 250;
var numberOfStars = 1;
var maxTailLength = 50;
var timeLapse = 10;

var space = new Space();
space.generateBodies(numberOfPlanets, numberOfStars);

var clock = new THREE.Clock();

var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
        
document.addEventListener('mousemove', onDocumentMouseMove, false);

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    camera.target = new THREE.Vector3();
    
    controls = new THREE.RollControls(camera);

    controls.movementSpeed = 4000;
    controls.lookSpeed = 1000;
    //controls.constrainVertical = [-0.5, 0.5];
    //controls.autoForward = true;

    scene.add(camera);



    var sunIndex = space.bodies.length - 1;
    scene.position.x = space.bodies[sunIndex].position.x;
    scene.position.y = space.bodies[sunIndex].position.y;
    scene.position.z = space.bodies[sunIndex].position.z;
   camera.position = new THREE.Vector3( scene.position.x * 5, scene.position.y * 5, scene.position.z * 5 );

    for (var i = 0; i < space.bodies.length; i++) {
        var body = space.bodies[i];
        var bodyMaterial = new THREE.ParticleCanvasMaterial({ color: 0xCCCC00, program: body.draw.bind(body) });
        //var bodyMaterial = new THREE.MeshNormalMaterial({ color: 0xCCCC00, program: body.draw.bind(body) });
        var particle = new THREE.Particle(bodyMaterial);
        body.particle = particle;
        particle.position = body.position;

        scene.add(particle);
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    animate();
}


function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) * 10;
    mouseY = (event.clientY - windowHalfY) * 10;
}

//
function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render() {
    controls.update(clock.getDelta());

    space.calculateNewPositions(timeLapse);

//    camera.position.x += (mouseX - camera.position.x) * .05;
    //    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);

}
