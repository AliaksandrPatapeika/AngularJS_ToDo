// Karma configuration
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './app',

    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      'lib/angular-animate/angular-animate.js',
      'lib/angular-resource/angular-resource.js',
      'lib/angular-route/angular-route.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(lib)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    // enable / disable watching file and executing tests whenever any file changes (WebStorm disables autoWatch in Karma configuration)
    autoWatch: true,

    // frameworks to use
    frameworks: ['jasmine'],

    // start these browsers
    browsers: ['Chrome', 'Firefox'],

    // list of plugins to load. By default, Karma loads all sibling NPM modules which have a name starting with `karma-*`.
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
