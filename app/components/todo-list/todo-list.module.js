(function () {
  'use strict';

  angular
      .module('todoList', [
        'core.todo',
        'loading',
        'errorContainer',
        'headContainer',
        'search',
        'filterButtonsGroup',
        'taskItemList',
        'addTask'
      ]);

})();
