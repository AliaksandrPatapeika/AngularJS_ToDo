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
      $ctrl.remainingTasks = remainingTasks;
      $ctrl.archiveCompletedTasks = archiveCompletedTasks;
    }

    function remainingTasks() {
      return $ctrl.tasks.filter((task) => !task.done).length;
    }

    function archiveCompletedTasks() {
      const oldTasks = $ctrl.tasks;
      let doneTasksIdList = [];

      $ctrl.tasks.forEach((task) => {
        if (task.done) {
          doneTasksIdList.push(task._id);
        }
      });

      if (doneTasksIdList.length) {
        $ctrl.tasks = $ctrl.tasks.filter((task) => {
          return !task.done;
        });
        todoService.deleteTaskArray(doneTasksIdList);

        // TEST!!!!!
      //   let test = [{
      //     text: '111',
      //     done: false,
      //     important: false,
      //     date: new Date().toISOString(),
      //     description: "1111111"
      //   },
      //     {
      //       text: '222',
      //       done: false,
      //       important: false,
      //       date: new Date().toISOString(),
      //       description: "2222222"
      //     },
      //     {
      //       text: '333',
      //       done: false,
      //       important: false,
      //       date: new Date().toISOString(),
      //       description: "3333333"
      //     }];
      //
      // todoService.addTaskArray(test);

      } else {
        console.log('Nothing to archive');
      }

      console.log('Old todo list: ', oldTasks);
      console.log('$ctrl.tasks: ', $ctrl.tasks);

    }

  }

})();
