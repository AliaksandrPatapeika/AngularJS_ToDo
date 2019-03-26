'use strict';

function TaskDetailController(Task, $routeParams) {

  // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
  // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

  // Иногда полагаться на будущий объект и только привязку данных недостаточно для выполнения всего, что нам нужно,
  // поэтому в этих случаях мы можем добавить функцию обратного вызова для обработки ответа сервера.

  // Получаем коллекцию с сервера
  const tasks = Task.query(() => {
    // После загрузки данных, получаем текущее задание для task detail view, полученное по id текущего задания из $routeParams
    this.task = tasks.find((task) => {
      return task.id === $routeParams.taskId;
    });

  });

}

// Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
angular.module('taskDetail')
    .component('taskDetail', {
      templateUrl: 'task-detail/task-detail.template.html',
      controller: ['Task', '$routeParams', TaskDetailController]
    });