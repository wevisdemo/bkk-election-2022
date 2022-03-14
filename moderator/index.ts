import fastify from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';

const PORT = 3000;

const server = fastify();

const routes: { name: string; path: string; port: number }[] = [
  { name: 'Social Trend', path: '/socialtrend', port: 3002 },
  { name: 'Landing', path: '/', port: 3001 },
];

routes.forEach(({ name, path, port }) => {
  server.register(fastifyHttpProxy, {
    upstream: `http://localhost:${port}${path}`,
    prefix: path,
  });
});

const start = async () => {
  try {
    await server.listen(PORT);

    console.log(`Moderator gateway is running`);

    routes.forEach(({ name, path }) => {
      console.log(`> [${name}] http://localhost:${PORT}${path}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
