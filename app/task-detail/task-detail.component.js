'use strict';

// Зарегистрировать компонент `taskDetail` в модуле `taskDetail` вместе со связанным с ним контроллером и шаблоном
angular.module('taskDetail')
    .component('taskDetail', {
      templateUrl: 'task-detail/task-detail.template.html',
      controller: ['$http', '$routeParams',
        function TaskDetailController($http, $routeParams) {

          $http.get('tasks/tasks.json').then((response) => {
            // В свойстве `data` объекта ответа, переданного обратному вызову (callback) содержится массив объектов списка заданий из JSON файла
            const tasks = response.data;
            const currentTaskId = $routeParams.taskId;

            function checkId(task) {
              return task.id === currentTaskId;
            }

            // Текущее задание для task detail view
            this.task = tasks.find(checkId);
          });
        }
      ]
    });