/**
 * Registry point for rules.
 */
var Rules = {
		rules: {},
		
		register: function(typeName, rule){
			this.rules[typeName] = rule;
		},
		
		createInstance: function(config){
			return new this.rules[config.type](config);
		}
};
