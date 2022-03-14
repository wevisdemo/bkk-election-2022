import fastify from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';
import apps from './apps.config.json';

const PORT = 3000;

const server = fastify();

apps.forEach(({ name, path, port }) => {
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
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
