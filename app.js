// создание модуля
angular.module('todoList', [])
// контроллер, где будут обрабатываться все данные. $scope - хранилище
    .controller('ctrl', function ($scope) {
      // Создать временную переменную
      $scope.tempInput = 'test task';

      // Создать хранилище для всех заданий
      $scope.taskArray = ['Task 1', 'Task 2', 'Task 3'];

      // Создать функцию, которая переносит из временного хранилища в общие задания
      $scope.addTask = function () {
        if ($scope.tempInput) {
          $scope.taskArray.push($scope.tempInput)
          $scope.tempInput = '';
        } else {
          console.log('Empty input');
        }
      };

      $scope.deleteItem = function (item) {
        const index = $scope.taskArray.indexOf(item);
        $scope.taskArray.splice(index, 1)
      };

    });