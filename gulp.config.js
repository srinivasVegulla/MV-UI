module.exports = function() {
  var client = './src/client/';
  var server = './src/server/';
  var clientApp = client + 'app/';
  var report = './report/';
  var root = './';
  var specRunnerFile = 'specs.html';
  var temp = './.tmp/';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep({ devDependencies: true })['js'];
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };
  var nodeModules = 'node_modules';

  var config = {
    /**
     * File paths
     */
    // all javascript that we want to vet
    alljs: [
      './src/**/*.js',
      './*.js',
      '!./src/client/i18n/**/*.js'
    ],
    build: './src/main/resources/static/',
    client: client,
    css: temp + '**/*.css',
    fonts: [
      client + 'fonts/**/*.*',
      bower.directory + 'bootstrap-sass-official/assets/fonts/bootstrap/**/*.*',
      bower.directory + 'Font-Awesome/fonts/**/*.*',
      bower.directory + 'angular-ui-grid/**/*.svg',
      bower.directory + 'angular-ui-grid/**/*.ttf',
      bower.directory + 'angular-ui-grid/**/*.woff',    
      bower.directory + 'angular-ui-grid/**/*.eot'
    ],
    html: client + '**/*.html',
    htmltemplates: clientApp + '**/*.html',
    images: client + 'images/**/*.*',
    index: client + 'index.html',
    // app js, with no specs
    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js',
      '!e2e_tests/**/*.spec.js'
    ],
    jsOrder: [
      '**/app.module.js',
      '**/*.module.js',
      '**/*.js'
    ],
    sass: [
      client + 'styles/**/*.scss',
      clientApp + '**/**/*.scss',
    ],
    report: report,
    root: root,
    server: server,
    source: 'src/',
    stubsjs: [
      bower.directory + 'angular-mocks/angular-mocks.js',
      client + 'stubs/**/*.js'
    ],
    temp: temp,
    i18n: [
      client + 'i18n/**/*.json',
      client + 'i18n/**/*.js'
    ],
    /**
     * optimized files
     */
    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    /**
     * plato
     */
    plato: { js: clientApp + '**/*.js' },

    /**
     * browser sync
     */
    browserReloadDelay: 2000,
    browserSyncPort: 3000,

    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        root: 'app/',
        standalone: false
      }
    },

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],

    /**
     * specs.html, our HTML spec runner
     */
    specRunner: client + specRunnerFile,
    specRunnerFile: specRunnerFile,

    /**
     * The sequence of the injections into specs.html:
     *  1 testlibraries
     *      mocha setup
     *  2 bower
     *  3 js
     *  4 spechelpers
     *  5 specs
     *  6 templates
     */
    testlibraries: [
      nodeModules + '/mocha/mocha.js',
      nodeModules + '/chai/chai.js',
      nodeModules + '/sinon-chai/lib/sinon-chai.js',
      nodeModules+ '/sinon-stub-promise/index.js'
    ],
    specHelpers: [client + 'test-helpers/*.js'],
    specs: [clientApp + '**/*.spec.js'],
    serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js'],

    /**
     * Node settings
     */
    nodeServer: server + 'app.js',
    defaultPort: '8001',
    nodeDebugPort: '5858',
  };

  /**
   * wiredep and bower settings
   */
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  /**
   * karma settings
   */
  config.karma = getKarmaOptions();

  return config;

  ////////////////

  function getKarmaOptions() {
    var options = {
      port: 8888,
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        clientApp + '**/*.module.js',
        clientApp + '**/*.js',
        temp + config.templateCache.file,
        config.serverIntegrationSpecs,
        nodeModules+ '/sinon-stub-promise/index.js'
      ),
      exclude: [],
      coverage: {
        dir: report + 'coverage',
        reporters: [
          // reporters not supporting the `file` property
          { type: 'html', subdir: 'report-html' },
          { type: 'lcov', subdir: 'report-lcov' },
          { type: 'text-summary' } //, subdir: '.', file: 'text-summary.txt'}
        ]
      },
      preprocessors: {}
    };
    options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};
