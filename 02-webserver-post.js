const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  console.log('Requested Method : ', req.method)
  console.log('Requested URL : ', req.url)

  res.statusCode = 200;

  if(req.method === 'GET'){
    if (req.url === '/json') {
      res.setHeader('Content-Type', 'application/json');
      const anyObj = {
        'key': 'value'
      }
      res.end(JSON.stringify(anyObj));
    } else if (req.url === '/html') {
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Hello World</h1>');
    } else if (req.url === '/txt') {
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    }

    return;
    
  } else if(req.method === 'POST'){
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      res.writeHead(200,{'Content-Type': 'text/plain'})
      res.end(body)
    })

    return;
  }

  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.write('<h1>Page Not Found</h1>')
  res.end();
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});