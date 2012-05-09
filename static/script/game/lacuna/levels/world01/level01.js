var level0101 = {
    type: 'lacunalevel',
    id: 'l_0101',
    gameId: Lacuna.gameId,
    title: 'Level 1',
    world: '01',
    level: '01',
    thumbnail: '',
    backgroundImage: '',
    scoreRequirements: { totalPoints: { bronze: 100, silver: 200, gold: 300 }, shipsLanded: { bronze: 1, silver: 2, gold: 3} },
    rules: Lacuna.getDefaultRules(),
    spaceObjects: [{ type: 'launchplatform',
        position: { x: Lacuna.gameWidth / 2, y: Lacuna.gameHeight - 50 },
        launchCapacity: 3
    },
	    				{ type: 'landingzone',
	    				    position: { x: Lacuna.gameWidth / 2, y: 50 },
	    				    direction: { x: 1, y: 0 }
	    				}
                        ,
	    				{ type: 'reward',
	    				    position: { x: Lacuna.gameWidth / 2, y: Lacuna.gameHeight * 3 / 4 },
	    				    points: 250
	    				}
                        ,
	    				{ type: 'reward',
	    				    position: { x: Lacuna.gameWidth / 2, y: Lacuna.gameHeight * 2 / 4 },
	    				    points: 500
	    				}
                        ,
	    				{ type: 'reward',
	    				    position: { x: Lacuna.gameWidth / 2, y: Lacuna.gameHeight / 4 },
	    				    points: 250
	    				}
	                   ]
};

Levels.register(Lacuna.gameId, 'l_0101', level0101);