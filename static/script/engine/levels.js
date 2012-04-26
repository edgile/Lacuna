var Levels = {};

Levels.register = function (identifier, level) {
    Levels[identifier] = level;
};

Levels.load = function (config) {
    return new Levels[config.name](config);
};