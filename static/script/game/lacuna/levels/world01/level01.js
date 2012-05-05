var level0101 = {
		type: 'lacunalevel',
		id: 'l_0101',
		gameId: Constants.gameId,
		title: 'Level 1 word 1',
	    world: '01',
	    level: '01',
	    thumbnail: '',
	    backgroundImage: '',
	    scoreRequirements: {totalPoints: {bronze: 100, silver: 200, gold: 300}, shipsLanded: {bronze: 1, silver: 2, gold: 3}},
	    rules: Constants.getDefaultRules(),
	    spaceObjects: [{ type: 'launchplatform',
	        position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight - 50)
	    				},
	    				{ type: 'landingzone',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, 50),
	    					direction: new THREE.Vector2(1, 0)
	    	            }
                        ,
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight * 3 / 4),
	    				    points: 250
	    				}
                        ,
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight * 2 / 4),
                            points: 500
	    				}
                        ,
	    				{ type: 'reward',
	    				    position: new THREE.Vector2(Constants.gameWidth / 2, Constants.gameHeight / 4),
	    				    points: 250
	    				}
	                   ]
};

Levels.register(Constants.gameId, 'l_0101', level0101);