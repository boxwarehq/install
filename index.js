const fastify = require('fastify')({ logger: true });
const path = require('path');

const port = process.env.PORT || 3000;

fastify.register(require('fastify-log'));

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

fastify.get('/', async (req, reply) => {
  reply.type('text/plain').sendFile('install.sh');
});

fastify.get('*', async (req, reply) =>
  reply.code(403).send(`You shouldn't be here`)
);

fastify.listen(port, err => {
  if (err) throw fastify.error(err);
  fastify.info(`Server listening on port ${port}`);
});
