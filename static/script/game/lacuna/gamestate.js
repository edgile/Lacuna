function GameState() {
    // Default values
    this.totalShipsLaunched = 0;
    this.totalShipsLanded = 0;
    this.totalPerfectLandings = 0;
    this.totalShipsExploded = 0;
};

/**
*/
GameState.prototype.Persist = function () {
    Engine.setItem("lacuna.gamestate", JSON.stringify(this));
};

GameState.Load = function () {
    return Engine.getItem("lacuna.gamestate", new GameState());
};