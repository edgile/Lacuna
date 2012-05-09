var level0103 = {
    type: 'lacunalevel',
    id: 'l_0103',
    gameId: Lacuna.gameId,
    title: 'Level 3',
    world: '01',
    level: '03',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Lacuna.getDefaultRules(),
    spaceObjects: [{ type: 'launchplatform',
                            position: new THREE.Vector2(Lacuna.gameWidth / 2, Lacuna.gameHeight - 50),
                            launchCapacity: 3
                        },
	    				{ type: 'landingzone',
	    				    position: new THREE.Vector2(Lacuna.gameWidth / 2, 50),
	    				    direction: new THREE.Vector2(1, 0)
	    				},
	    				{ type: 'star',
	    				    position: new THREE.Vector2(Lacuna.gameWidth / 4, Lacuna.gameHeight / 3),
	    				    direction: new THREE.Vector2(0, 0),
	    				    mass: 30000000,
	    				    density: 2000,
                            static: true
	    				},
	    				{ type: 'star',
	    				    position: new THREE.Vector2(3 * Lacuna.gameWidth / 4, 2 * Lacuna.gameHeight / 3),
	    				    direction: new THREE.Vector2(0, 0),
	    				    mass: 30000000,
	    				    density: 2000,
	    				    static: true
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Lacuna.gameWidth / 2, Lacuna.gameHeight / 2),
	    				    points: 500
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Lacuna.gameWidth / 2 + 20, Lacuna.gameHeight / 4),
	    				    points: 250
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Lacuna.gameWidth / 2 - 29, 3 * Lacuna.gameHeight / 4),
	    				    points: 250
	    				}
	                   ]
};

Levels.register(Lacuna.gameId, 'l_0103', level0103);