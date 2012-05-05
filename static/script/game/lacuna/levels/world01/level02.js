var level0102 = {
    type: 'lacunalevel',
    id: 'l_0102',
    gameId: Constants.gameId,
    title: 'Level 2 word 1',
    world: '01',
    level: '02',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Constants.getDefaultRules(),
    spaceObjects: [{ type: 'launchplatform',
        position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight - 50)
                        },
	    				{ type: 'landingzone',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, 50),
	    				    direction: new THREE.Vector2(1, 0)
	    				},
	    				{ type: 'star',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight / 2),
	    				    direction: new THREE.Vector2(0, 0),
	    				    mass: 20000000,
	    				    density: 2000,
                            static: true
	    				},
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2 - 150, Constants.gameHeight / 2),
	    				    points: 250
	    				},
                        { type: 'reward',
                            position: new THREE.Vector2(Constants.gameWidth / 2 + 150, Constants.gameHeight / 2),
                        	points: 250
                        }

	                   ]
};

Levels.register(Constants.gameId, 'l_0102', level0102);