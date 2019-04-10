(function () {
  'use strict';

  angular
      .module('addTask')
      .component('addTask', {
        templateUrl: 'components/add-task/add-task.template.html',
        controller: AddTaskController,
        bindings: {
          tasks: '<'
        }
      });

  AddTaskController.$inject = ['todoService'];

  function AddTaskController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.addTask = addTask;
    }

    function addTask(taskText) {
      // не добавлять пустые задания
      if ($ctrl.addTaskInputText) {
        $ctrl.addTaskInputText = '';
        let newTask = {
          text: taskText,
          done: false,
          important: false,
          date: new Date().toISOString(),
          description: ""
        };

        $ctrl.tasks.push(newTask);
        todoService.addTask(newTask).then(() => {
          // reload state to fetch new task _id from restdb
          todoService.reloadState();
        });
      } else {
        console.log('Empty input');
      }
    }

  }

})();
