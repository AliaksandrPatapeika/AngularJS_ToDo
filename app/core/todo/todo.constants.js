(function() {
  'use strict';

  angular
      .module('core.todo')
      .constant('constants', {
        APP_VERSION: '0.0.1'
      })
      .constant('restdb', {
        apiKey: '63fae906273edca8d9556ecacda418e4c2a4f',
        databaseName: 'todolist'
      });

})();