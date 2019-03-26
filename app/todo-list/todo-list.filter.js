'use strict';

// использование модуля `todoList` для регистрации фильтра
angular.module('todoList')
// создание фильтра для списка заданий
    .filter('taskList', function () {
      return function (taskList, filterName) {
        switch (filterName) {
          case 'all':
            return taskList;
          case 'active':
            return taskList.filter((task) => (!task.done));
          case 'done':
            return taskList.filter((task) => task.done);
          default:
            console.log('Default for debug. FilterName =', filterName);
            return taskList;
        }
      };
    });
