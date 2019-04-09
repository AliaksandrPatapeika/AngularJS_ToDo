(function () {
  'use strict';

  angular
      .module('taskItem')
      .component('taskItem', {
        templateUrl: 'components/task-item/task-item.template.html',
        controller: TaskItemController,
        bindings: {
          tasks: '<',
          searchTask: '<',
          filterName: '<'
        }
      });

  // TaskItemController.$inject = ['$location'];
  TaskItemController.$inject = ['todoService'];

  // function TaskItemController($location) {
  function TaskItemController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.importantTask = importantTask;
      $ctrl.taskDoneChange = taskDoneChange;
      $ctrl.deleteTask = deleteTask;
      // $ctrl.goToTaskDetailView = goToTaskDetailView;
      $ctrl.navigate = todoService.navigate;
    }

    function importantTask(task) {
      task.important = !task.important;
      todoService.updateTask(task);
    }

    function taskDoneChange(task) {
      todoService.updateTask(task);
    }

    function deleteTask(task) {
      // const index = $ctrl.tasks.indexOf(task);
      // $ctrl.tasks.splice(index, 1);
      todoService.deleteTask(task);
    }

    // function goToTaskDetailView(task) {
      // $location.path(`/tasks/${task.id}`);
      // $state.go("taskDetail", {taskId: task.id});
    // }

  }

})();
