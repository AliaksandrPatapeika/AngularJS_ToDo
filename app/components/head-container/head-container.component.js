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

  HeadContainerController.$inject = ['todoService'];

  function HeadContainerController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.remainingTasks = remainingTasks;
      $ctrl.archiveCompletedTasks = archiveCompletedTasks;
    }

    function remainingTasks() {
      return $ctrl.tasks.filter((task) => !task.done).length;
    }

    function archiveCompletedTasks() {
      let doneTasksIdList = [];
      let archiveTask = [];
      let remainingTasks = [];

      $ctrl.tasks.forEach((task) => {
        if (task.done) {
          archiveTask.push(task);
          doneTasksIdList.push(task._id);
        } else {
          remainingTasks.push(task);
        }
      });

      if (doneTasksIdList.length) {
        $ctrl.loading = true;
        todoService.deleteTaskArray(doneTasksIdList)
            .then(() => {
              $ctrl.loading = false;
              $ctrl.tasks = remainingTasks;
              console.log('Archive tasks: ', archiveTask);
            });
      } else {
        console.log('Nothing to archive');
      }

    }

  }

})();
