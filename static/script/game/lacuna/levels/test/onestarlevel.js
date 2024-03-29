﻿var OneStarLevel = {
    type: 'lacunalevel',
    id: 'test_onestar',
    gameId: Lacuna.gameId,
    title: 'Test (one star)',
    world: '00',
    level: '00',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Lacuna.getDefaultRules(),
    spaceObjects: [
            { type: 'launchplatform', position: new THREE.Vector2(Lacuna.gameWidth / 2, Lacuna.gameHeight - 50) },
            { type: 'landingzone', position: new THREE.Vector2(Lacuna.gameWidth / 2, 50), direction: new THREE.Vector2(1, 0) },
            { type: 'star', position: new THREE.Vector2(Lacuna.gameWidth / 2, Lacuna.gameHeight / 2), mass: 200000, density: 4000 }
        ]
};

Levels.register(Lacuna.gameId, 'test_onestar', OneStarLevel);
