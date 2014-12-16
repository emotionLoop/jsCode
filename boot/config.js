
// # config

var path = require('path');

var parentDir = path.join(__dirname, '..');
var appDir = path.join(parentDir, 'app');

var pkg = require(path.join(parentDir, 'package'));

var assetsDir = path.join(parentDir,'assets');
var publicDir = path.join(assetsDir, 'public');
var viewsDir = path.join(appDir, 'views');

var maxAge = 24 * 60 * 60 * 1000;

exports = module.exports = function() {

  return {

    defaults: {
      pkg: pkg,
      cache: false,
      showStack: true,
      assetsDir: assetsDir,
      publicDir: publicDir,
      views: {
        dir: viewsDir,
        engine: 'jade'
      },
      session: {
        secret: 'jscode-secret',
        key: 'jscode',
        cookie: {
          maxAge: maxAge
        },
        resave: true,
        saveUninitialized: true
      },
      trustProxy: true,
      staticServer: {
        maxAge: maxAge
      },
      server: {
        host: 'localhost',
        cluster: false,
        ssl: {
          enabled: false,
          options: {}
        }
      },
      cookieParser: 'jscode-secret',
      csrf: {
        enabled: true,
        options: {
          cookie: {
            maxAge: maxAge
          }
        }
      },
      mongo: {
        host: 'localhost',
        port: 27017,
        opts: {},
        // faster - don't perform 2nd request to verify
        // log message was received/saved
        safe: false
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: maxAge
      },
      output: {
        handleExceptions: false,
        colorize: true,
        prettyPrint: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false,
        hipchat: false,
        slack: false
      },
      less: {
        path: publicDir,
        options: {
          force: true
        }
      },
      jade: {
        amd: {
          path: '/js/tmpl/',
          options: {}
        }
      },
      liveReload: {
        port: 35729
      }
    },

    test: {
      url: 'http://localhost:5000',
      server: {
        env: 'test',
        port: 5000
      },
      redis: {
        prefix: 'jscode_test'
      },
      mongo: {
        dbname: 'jscode-test',
        db: 'jscode-test' // keep for winston logger
      },
      logger: {
        'console': false,
        requests: false,
        mongo: false
      }
    },

    development: {
      cache: true,
      url: 'http://localhost:3000',
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        dbname: 'jscode-development',
        db: 'jscode-development' // keep for winston logger
      },
      redis: {
        prefix: 'jscode-development'
      }
    },

    production: {
      cache: true,
      url: 'http://jscode.org',
      views: {
        dir: path.join(assetsDir, 'dist'),
      },
      publicDir: path.join(assetsDir, 'dist'),
      showStack: false,
      updateNotifier: {
        enabled: false,
      },
      server: {
        env: 'production',
        port: 3051,
        cluster: true
      },
      mongo: {
        dbname: 'jscode-production',
        db: 'jscode-production' // keep for winston logger
      },
      redis: {
        prefix: 'jscode_production'
      },
      output: {
        colorize: false
      },
      logger: {
        'console': true,
        requests: false,
        mongo: false,
        file: false
      }
    }

  };

};

exports['@singleton'] = true;
