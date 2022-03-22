import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import { join } from 'path';
import apps from './apps.config.json';
import assets from './assets.config.json';

const PORT = 3000;
export const STATIC_PATH = '/static/';

const app = express();
var server = http.createServer(app);

assets.forEach(({ source, serve }) => {
  app.use(serve, express.static(join(__dirname, '..', source)));
});

apps.forEach(({ path, port, websocket }) => {
  if (websocket) {
    const wsPropxy = httpProxy.createProxyServer({
      target: `ws://localhost:${port}`,
    });

    app.get(`${websocket}*`, (req, res) => wsPropxy.ws(req, res, {}));
    server.on('upgrade', (req, socket, head) => wsPropxy.ws(req, socket, head));
  }

  const webProxy = httpProxy.createProxyServer({
    target: `http://localhost:${port}`,
  });

  app.get(`${path}*`, (req, res) => {
    webProxy.web(req, res, {});
  });
});

server.listen(PORT);

console.log(`Moderator gateway is running`);

assets.forEach(({ name, serve }) => {
  console.log(`> [Asset] ${name} - http://localhost:${PORT}${serve}`);
});

apps.forEach(({ name, path }) => {
  console.log(`> [App] ${name} - http://localhost:${PORT}${path}`);
});
