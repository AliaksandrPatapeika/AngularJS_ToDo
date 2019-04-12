(function () {
  'use strict';

  // Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
  angular
      .module('taskDetail')
      .component('taskDetail', {
        templateUrl: 'components/task-detail/task-detail.template.html',
        controller: TaskDetailController
      });

  TaskDetailController.$inject = ['$stateParams', 'todoService'];

  function TaskDetailController($stateParams, todoService) {
    // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
    // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

    // Иногда полагаться на будущий объект и только привязку данных недостаточно для выполнения всего, что нам нужно,
    // поэтому в этих случаях мы можем добавить функцию обратного вызова для обработки ответа сервера.

    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.navigate = navigate;
      loadData()
    }

    function navigate(toState, params) {
      todoService.navigate(toState, params);
    }

    function loadData() {
      $ctrl.loading = true;
      // После загрузки данных, получаем текущее задание для task detail view, полученное по id текущего задания из $stateParams
      todoService.getTaskById($stateParams.taskId)
          .then((task) => {
            $ctrl.loading = false;
            $ctrl.task = task;
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.error = error.message.split('\n');
          });
    }

  }

})();
