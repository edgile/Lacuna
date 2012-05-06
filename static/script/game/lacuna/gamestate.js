/**
 * Object that holds the state of the game.
 * @class
 * @returns
 */
function GameState() {
    // Default values
    this.totalShipsLaunched = 0;
    this.totalShipsLanded = 0;
    this.totalPerfectLandings = 0;
    this.totalShipsExploded = 0;
};

/**
 * Stores the state.
 * @function
 * @public
*/
GameState.prototype.Persist = function () {
    Engine.setItem("lacuna.gamestate", JSON.stringify(this));
};

/**
 * Retrieves the game state from storage.
 * @function
 * @static
 * @returns GameState as stored or an empty default GameState object
 */
GameState.Load = function () {
    return Engine.getItem("lacuna.gamestate", new GameState());
};