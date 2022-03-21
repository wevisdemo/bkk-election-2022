import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import { join } from 'path';
import apps from './apps.config.json';

const PORT = 3000;
export const STATIC_PATH = '/static/';

const app = express();
var server = http.createServer(app);

app.use(STATIC_PATH, express.static(join(__dirname, '..', STATIC_PATH)));

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

apps.forEach(({ name, path }) => {
  console.log(`> [${name}] http://localhost:${PORT}${path}`);
});

console.log(`> [static assets] http://localhost:${PORT}${STATIC_PATH}`);
