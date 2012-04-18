var connect = require('connect');

var server = connect()
	.use(connect.static(__dirname + '/static')
);
server.listen(8001);