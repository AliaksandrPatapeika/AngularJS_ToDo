(function () {
  'use strict';

  angular
      .module('core.todo')
      .constant('restdb', {
        databaseName: 'todolist-f2d4',
        collectionName: 'tasks',
        apikey: '5cab611993d77c26f9734963'
      });

})();
