/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'context-story',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
	contentSecurityPolicy: {
	      'default-src': "'none'",
	      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
	      'font-src': "'self'",
	      'connect-src': "*",
	      'img-src': "'self'",
	      'report-uri':"'localhost'",
	      'style-src': "'self' 'unsafe-inline'",
	      'frame-src': "'none'"
	    }

  };

  if (environment === 'development') {
      ENV.APP.LOG_TRANSITIONS = true;
      ENV.APP.API_HOST = 'http://context-blog.herokuapp.com';
      ENV.APP.API_NAMESPACE = 'api';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.API_HOST = 'http://context-blog.herokuapp.com';
    ENV.APP.API_NAMESPACE = 'api';
  }

  return ENV;
};
