// Karma configuration
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './app',

    // list of files / patterns to load in the browser
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'js/app.js',
      'js/app.spec.js',
    ],

    // frameworks to use
    frameworks: ['jasmine'],

    // start these browsers
    browsers: ['Chrome', 'Firefox'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

  });
};
