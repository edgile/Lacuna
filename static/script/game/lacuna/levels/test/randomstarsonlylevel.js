﻿var  RandomStarsOnlyLevel = {
    type: 'lacunalevel',
    id: 'test_randomstarsonlylevel',
    gameId: Lacuna.gameId,
    title: 'Test - Random stars',
    world: '00',
    level: '00',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Lacuna.getDefaultRules(),
    spaceObjects: RandomStarsOnlyLevelGetSpaceObjects()
};

Levels.register(Lacuna.gameId, 'test_randomstarsonlylevel', RandomStarsOnlyLevel);

function RandomStarsOnlyLevelGetSpaceObjects() {
    var numberOfStars = Math.floor(Math.random() * 10);

    var result = [];
    result.push({ type: 'launchplatform', position: new THREE.Vector2(Lacuna.gameWidth / 2, Lacuna.gameHeight - 50) });
    result.push({ type: 'landingzone', position: new THREE.Vector2(Lacuna.gameWidth / 2, 50), direction: new THREE.Vector2(1, 0) });

    var maxRandomStarMass = 300000;
    var maxRandomStarDensity = 10000;
    for (var i = 1; i <= numberOfStars; i++) {
        result.push({ type: 'star',
                mass: Math.random() * maxRandomStarMass,
                density: Math.random() * maxRandomStarDensity,
                position: new THREE.Vector2(Math.random() * Lacuna.gameWidth, Math.random() * Lacuna.gameHeight),
                direction: new THREE.Vector2(0, 0),
                static: true,
                influencedByGravity: false
            }
        );
    }

    return result;
};