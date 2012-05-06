var level0103 = {
    type: 'lacunalevel',
    id: 'l_0103',
    gameId: Constants.gameId,
    title: 'Level 3 word 1',
    world: '01',
    level: '03',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Constants.getDefaultRules(),
    spaceObjects: [{ type: 'launchplatform',
                            position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight - 50),
                            launchCapacity: 3
                        },
	    				{ type: 'landingzone',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, 50),
	    				    direction: new THREE.Vector2(1, 0)
	    				},
	    				{ type: 'star',
	    				    position: new THREE.Vector2(Constants.gameWidth / 4, Constants.gameHeight / 3),
	    				    direction: new THREE.Vector2(0, 0),
	    				    mass: 30000000,
	    				    density: 2000,
                            static: true
	    				},
	    				{ type: 'star',
	    				    position: new THREE.Vector2(3 * Constants.gameWidth / 4, 2 * Constants.gameHeight / 3),
	    				    direction: new THREE.Vector2(0, 0),
	    				    mass: 30000000,
	    				    density: 2000,
	    				    static: true
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight / 2),
	    				    points: 500
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2 + 20, Constants.gameHeight / 4),
	    				    points: 250
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2 - 29, 3 * Constants.gameHeight / 4),
	    				    points: 250
	    				}
	                   ]
};

Levels.register(Constants.gameId, 'l_0103', level0103);