const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req, res) => {
	// console.log(`${req.url == '/' ? "text/html" : type(req.url)}`)
	res.writeHead(200, {
		"Content-Type": `${req.url == '/' ? "text/html" : type(req.url)}`
	})
	readFile("." + req.url, res);
}).listen(8888);

function type(url) {
	let index = url.lastIndexOf('.');
	let _type = url.slice(index + 1);
	// path.extname获得后缀
	switch (_type) {
		case 'js':
			return 'application/x-javascript';
			break;
		case 'css':
			return 'text/css';
			break;
		case 'png':
			return 'image/png';
			break;
		case 'html':
			return 'text/html';
			break;
		case 'svg':
			return 'image/svg+xml';
			break;
	}
}

function readFile(url, res) {
	if (url == './') {
		fs.readFile('./index.html', (err, data) => {
			if (err) throw err;
			res.write(data);
			res.end();
		})
	} else if(url=='./favicon.ico') {
		return;
	}else {
		fs.readFile(url, (err, data) => {
			if (err) throw err;
			res.write(data);
			res.end();
		})
	}
}
