const good = require('good');
const hapiPkg = require('hapi-pkg');
const hapiSwaggered = require('hapi-swaggered');
const hapiSwaggeredUi = require('hapi-swaggered-ui');
const inert = require('inert');
const vision = require('vision');
const version = require('../package.json').version;

const goodPlugin = {
  register: good,
  options: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', error: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
};

const swaggeredPlugin = {
  register: hapiSwaggered,
  options: {
    info: {
      title: '<%= serviceId %> API',
      description: '<%= description %>',
      version
    }
  }
};

const swaggeredUiPlugin = {
  register: hapiSwaggeredUi,
  options: {
    title: '<%= serviceId %> API',
    path: '/docs'
  }
};

const pkgPlugin = {
  register: hapiPkg,
  options: {
    pkg: { status: 'ok', version },
    endpoint: 'healthcheck',
    config: { auth: false, description: 'Health status and version' }
  }
};

/**
 * Loads plugins and returns a promise is resolved when plugins
 * are finished loading.
 *
 * @param server
 * @param devMode
 * @returns {Promise}
 */
function loadPlugins(server, devMode = false) {
  return new Promise((resolve, reject) => {
    // Put production necessary plugins here.
    let plugins = [
      inert,
      vision,
      goodPlugin,
      pkgPlugin,
      swaggeredPlugin,
      swaggeredUiPlugin
    ];

    if (devMode) {
      // Add your dev plugins here.
      plugins = [...plugins];
    }

    server.register(plugins, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = loadPlugins;
