(function () {
  'use strict';

// использование модуля `todoList` для регистрации фильтра
  angular
      .module('todoList')
      // создание фильтра для списка заданий
      .filter('taskList', taskList);

  function taskList() {
    return taskListFilter;

    ////////////////

    function taskListFilter(taskList, filterName) {
      // проверка что на вход фильтра пришел массив
      if (angular.isArray(taskList)) {
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
      } else {
        return taskList;
      }
    }
  }

})();
