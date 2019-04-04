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
    // const tasks = todoService.getAllTasks().query(() => {
    //   // После загрузки данных, получаем текущее задание для task detail view, полученное по id текущего задания из $routeParams
    //   $ctrl.task = findTask(tasks, $routeParams.taskId);
    //   function findTask(tasks, taskId) {
    //     return tasks.find((task) => task.id === taskId);
    //   }
    // });
    // }

    // console.log('$ctrl.taskPromise: ', $ctrl.taskPromise);
    // console.log('Что получили: ', typeof $ctrl.taskPromise);
    // console.log('Получили объект 1: ', $ctrl.taskPromise instanceof Object);
    // console.log('Получили объект 2: ', angular.isObject($ctrl.taskPromise));
    // console.log('Получили ошибку: ', $ctrl.taskPromise instanceof Error);
    // console.log('Ошибка: ', $ctrl.taskPromise.message.split('\n'));

    // $ctrl.taskPromise здесь получается из метода resolve в app.config.js в $routeProvider

    if ($ctrl.taskPromise instanceof Error) {
      $ctrl.error = $ctrl.taskPromise.message.split('\n');
    } else if (angular.isObject($ctrl.taskPromise)) {
      $ctrl.task = $ctrl.taskPromise;
    }

    // console.log('$ctrl.task = ', $ctrl.task);
    // console.log('$ctrl.error = ', $ctrl.error);

  }

})();
