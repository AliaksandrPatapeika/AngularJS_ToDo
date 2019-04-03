(function () {
  'use strict';

  angular
      .module('headContainer')
      .component('headContainer', {
        templateUrl: 'components/head-container/head-container.template.html',
        controller: HeadContainerController,
        bindings: {
          tasks: '='
        }
      });

  function HeadContainerController() {
    let $ctrl = this;

    $ctrl.remainingTasks = remainingTasks;
    $ctrl.archiveCompletedTasks = archiveCompletedTasks;

    function remainingTasks() {
      return $ctrl.tasks.filter((task) => !task.done).length;
    }

    function archiveCompletedTasks() {
      const oldTasks = $ctrl.tasks;
      $ctrl.tasks = [];
      oldTasks.forEach((task) => {
        if (!task.done) {
          $ctrl.tasks.push(task);
        }
      });
      console.log('Old todo list: ', oldTasks);
    }

  }

})();
