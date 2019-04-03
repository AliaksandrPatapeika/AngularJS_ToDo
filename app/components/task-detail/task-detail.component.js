(function () {
  'use strict';

  // Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
  angular
      .module('taskDetail')
      .component('taskDetail', {
        templateUrl: 'components/task-detail/task-detail.template.html',
        controller: TaskDetailController,
        bindings: {
          task: '<'
        }
      });

  // TaskDetailController.$inject = ['$routeParams', 'todoService'];

  function TaskDetailController() {
    // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
    // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

    // Иногда полагаться на будущий объект и только привязку данных недостаточно для выполнения всего, что нам нужно,
    // поэтому в этих случаях мы можем добавить функцию обратного вызова для обработки ответа сервера.

    let $ctrl = this;

    // activate();
    //
    // function activate() {
    //   // Получаем коллекцию с сервера
    //   todoService.getAllTasks().query((tasks) => {
    //     // После загрузки данных, получаем текущее задание для task detail view, полученное по id текущего задания из $routeParams
    //     $ctrl.task = todoService.getTaskById(tasks, $routeParams.taskId);
    //   });
    // }
    console.log('TASK = ', $ctrl.task)
  }

})();
