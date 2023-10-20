import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/animal-clinic') {
    const contents = await fs.readFile("./index.html", "utf-8");

    response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(contents.toString());
  } else {
    response
      .writeHead(500, { 'Content-Type': 'text/html' })
      .end('The (unexpected) url is: ' + url + '. Maybe try double checking the url? <a href="/animal-clinic">This should be the correct link.</a>');
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});