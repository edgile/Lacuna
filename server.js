var connect = require('connect');
var port = 8001;

var server = connect()
	.use(connect.static(__dirname + '/static')
);
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port);