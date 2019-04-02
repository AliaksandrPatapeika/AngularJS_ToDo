(function () {
  'use strict';

  angular
      .module('headContainer')
      .component('headContainer', {
        templateUrl: 'components/head-container/head-container.template.html',
        controller: HeadContainerController,
        require: {
          parent: '^^todoList'
        }
      });

  function HeadContainerController() {
    let $ctrl = this;

    $ctrl.remainingTasks = remainingTasks;
    $ctrl.archiveCompletedTasks = archiveCompletedTasks;

    function remainingTasks() {
      return $ctrl.parent.tasks.filter((task) => !task.done).length;
    }

    function archiveCompletedTasks() {
      const oldTasks = $ctrl.parent.tasks;
      $ctrl.parent.tasks = [];
      oldTasks.forEach((task) => {
        if (!task.done) {
          $ctrl.parent.tasks.push(task);
        }
      });
      console.log('Old todo list: ', oldTasks);
    }

  }

})();
