import fastify from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import apps from './apps.config.json';

const PORT = 3000;
export const STATIC_PATH = '/static/';

const server = fastify();

server.register(fastifyStatic, {
  root: join(__dirname, '..', STATIC_PATH),
  prefix: STATIC_PATH,
});

apps.forEach(({ path, port }) => {
  server.register(fastifyHttpProxy, {
    upstream: `http://localhost:${port}${path}`,
    prefix: path,
  });
});

const start = async () => {
  try {
    await server.listen(PORT);

    console.log(`Moderator gateway is running`);

    apps.forEach(({ name, path }) => {
      console.log(`> [${name}] http://localhost:${PORT}${path}`);
    });

    console.log(`> [static assets] http://localhost:${PORT}${STATIC_PATH}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
