(function () {
  'use strict';

  // Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
  angular
      .module('taskDetail')
      .component('taskDetail', {
        templateUrl: 'components/task-detail/task-detail.template.html',
        controller: TaskDetailController,
        bindings: {
          taskPromise: '<'
        }
      });

  TaskDetailController.$inject = ['todoService'];

  function TaskDetailController(todoService) {
    // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
    // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

    // Иногда полагаться на будущий объект и только привязку данных недостаточно для выполнения всего, что нам нужно,
    // поэтому в этих случаях мы можем добавить функцию обратного вызова для обработки ответа сервера.

    let $ctrl = this;

    init();

    function init() {
      // $ctrl.taskPromise здесь получается из метода resolve в app.config.js в $routeProvider
      if ($ctrl.taskPromise instanceof Error) {
        $ctrl.error = $ctrl.taskPromise.message.split('\n');
      } else if (angular.isObject($ctrl.taskPromise)) {
        $ctrl.task = $ctrl.taskPromise;
      }

      $ctrl.editTaskText = $ctrl.task.text;
      $ctrl.mode = 'editText';
      $ctrl.edit = edit;
      $ctrl.save = save;
      $ctrl.cancel = cancel;

    }

    function edit() {
      $ctrl.editTaskText = $ctrl.task.text;
      $ctrl.mode = 'editText';
    }

    function save(editTaskText) {
      $ctrl.task.text = editTaskText;
      todoService.updateTask($ctrl.task);
      $ctrl.mode = 'viewText';
    }

    function cancel() {
      $ctrl.mode = 'viewText';
    }

    // console.log('$ctrl.task = ', $ctrl.task);
    // console.log('$ctrl.error = ', $ctrl.error);

  }

})();
