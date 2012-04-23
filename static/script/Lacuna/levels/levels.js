var Levels = {};

Levels.register = function (identifier, level) {
    Levels[identifier] = level;
};

Levels.load = function (identifier) {
    return new Levels[identifier];
};