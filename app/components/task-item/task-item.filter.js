(function () {
  'use strict';

  angular
      .module('taskItem')
      .filter('taskList', taskList);

  function taskList() {
    return taskListFilter;

    function taskListFilter(taskList, filterName) {
      if (angular.isArray(taskList)) {
        switch (filterName) {
          case 'all':
            return taskList;
          case 'active':
            return taskList.filter((task) => (!task.done));
          case 'done':
            return taskList.filter((task) => task.done);
          default:
            return taskList;
        }
      } else {
        return taskList;
      }
    }
  }

})();
