(function () {
  'use strict';

  // Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
  angular
      .module('taskDetail')
      .component('taskDetail', {
        templateUrl: 'components/task-detail/task-detail.template.html',
        controller: TaskDetailController
      });

  TaskDetailController.$inject = ['$routeParams', 'todoService'];

  function TaskDetailController($routeParams, todoService) {
    // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
    // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

    // Иногда полагаться на будущий объект и только привязку данных недостаточно для выполнения всего, что нам нужно,
    // поэтому в этих случаях мы можем добавить функцию обратного вызова для обработки ответа сервера.

    let $ctrl  = this;

    activate();

    ////////////

    function activate() {
      // Получаем коллекцию с сервера
      const tasks = todoService.getTaskList().query(() => {
        // После загрузки данных, получаем текущее задание для task detail view, полученное по id текущего задания из $routeParams
        $ctrl.task = findTask(tasks, $routeParams.taskId);

        ////////////
        // TODO: вынеси этот метод в todoService как в видео AngularJS 1.X: Part IX. Routing на 51 минуте
        function findTask(tasks, taskId) {
          return tasks.find((task) => task.id === taskId);
        }

      });
    }

  }

})();
