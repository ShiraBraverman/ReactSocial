const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET') {
        if (parsedUrl.pathname === '/index.html') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<html><body><h1>Hello, this is index.html</h1></body></html>');
        } else if (parsedUrl.pathname === '/users') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            const users = [{ id: 1, name: 'Avital' }, { id: 2, name: 'Michal' }];
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    } else if (req.method === 'POST') {
        if (parsedUrl.pathname === '/user') {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res.end('User created successfully!');
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(8080);