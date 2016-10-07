// require dependencies
var http = require('http');
var fs = require('fs');
var url = require('url');

// set port to 8080
var PORT = 8080;

// setup web server
var server = http.createServer(handleRequest);

function handleRequest (req, res) {

	var urlParts = url.parse(req.url);

	// when visiting different urls, switch statement determines which url to call based on the path
	switch (urlParts.pathname) {
		case '/':
			serve("home.html");
			break;
		case '/home':
			serve("home.html");
			break;
		case '/food':
			serve("food.html");
			break;
		case '/movies':
			serve("movies.html");
			break;
		case '/css':
			serve("css.html");
			break;
		default:
			display404(urlParts.pathname, req, res);
	};

	function serve(page) {
		fs.readFile(page, function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		});
	};
};

// start server
server.listen(PORT, function() {
	console.log('Server is running on port # ' + PORT);
});

function display404 (url, req, res) {
	
	// write response code headers
	res.writeHead(404, {'Content-Type': 'text/html'});

	res.write('<h1>404 Not Found</h1>');
	res.end('The page you were looking for ' + url + ' cannot be found');
};