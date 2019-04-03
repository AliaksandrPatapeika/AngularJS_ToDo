(function () {
  'use strict';

  angular
      .module('taskItemList')
      .component('taskItemList', {
        templateUrl: 'components/task-item-list/task-item-list.template.html',
        controller: TaskItemListController,
        bindings: {
          tasks: '<',
          searchTask: '<',
          filterName: '<'
        }
      });

  function TaskItemListController() {
    let $ctrl = this;

  }

})();
