const Server = require('hapi').Server;
const loadPlugins = require('./lib/loadPlugins');

const server = new Server();
server.connection({port: 9000});

/**
 * Sets up a sample route.
 * TODO Replace this with your own code / modules
 */
function code() {
  server.route({
    method: 'GET',
    path: '/foobar',
    handler(request, reply) {
      reply({foo: 'bar'});
    },
    config: {
      description: 'foobar sample route',
      tags: ['api']
    }
  });
}

function startServer() {
  server.start(() => {
    server.log(
      ['<%= serviceId %>', 'info'],
      `Server running at: ${server.info.uri}`
    );
  });
}

function logErrors(err) {
  server.log(['<%= serviceId %>', 'error'], err);
}

// Loading Production plugins.
// devMode plugins are conditionally loaded.
loadPlugins(server, process.env.NODE_ENV === 'development')
  .then(code)
  .then(startServer)
  .catch(logErrors);
