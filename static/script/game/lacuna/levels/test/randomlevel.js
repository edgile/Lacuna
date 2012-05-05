var RandomLevel = {
    type: 'lacunalevel',
    id: 'test_randomlevel',
    gameId: Constants.gameId,
    title: 'Test - Random',
    world: '00',
    level: '00',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Constants.getDefaultRules(),
    spaceObjects: RandomLevelGetSpaceObjects()
};

Levels.register(Constants.gameId, 'test_randomlevel', RandomLevel);

function RandomLevelGetSpaceObjects() {
    var maxRandomPlanetMass = 2000;
    var maxRandomPlanetInitialSpeed = 100;
    var numberOfPlanets = Math.floor(Math.random() * 10);
    var numberOfStars = Math.floor(Math.random() * 10);

    var result = [];
    result.push({ type: 'launchplatform', position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight - 50) });
    result.push({ type: 'landingzone', position: new THREE.Vector2(Constants.gameWidth / 2, 50), direction: new THREE.Vector2(1, 0) });

    for (var i = 1; i <= numberOfPlanets; i++) {
        result.push({type: 'planet', 
                mass: Math.random() * maxRandomPlanetMass, 
                position: new THREE.Vector2(Math.random() * Constants.gameWidth, Math.random() * Constants.gameHeight),
                direction: new THREE.Vector2(Math.random(), Math.random()).setLength(maxRandomPlanetInitialSpeed * Math.random())
            }
        );
    }

    var maxRandomStarMass = 300000;
    var maxRandomStarDensity = 10000;
    for (var i = 1; i <= numberOfStars; i++) {
        result.push({ type: 'star',
                mass: Math.random() * maxRandomStarMass,
                density: Math.random() * maxRandomStarDensity,
                position: new THREE.Vector2(Math.random() * Constants.gameWidth, Math.random() * Constants.gameHeight),
                direction: new THREE.Vector2(0, 0),
                static: true,
                influencedByGravity: false
            }
        );
    }

    return result;
};