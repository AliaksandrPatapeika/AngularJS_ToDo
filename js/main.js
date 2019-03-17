// создание модуля
angular.module('todoListApp', [])
// контроллер, где будут обрабатываться все данные. $scope - хранилище
    .controller('todoListCtrl', function ($scope) {
      // хранилище для всех заданий
      $scope.taskList = [
        {text: 'learn AngularJS', done: true, important: false},
        {text: 'build an AngularJS app', done: false, important: false},
        {text: 'Other task', done: false, important: true}
      ];

      $scope.addTask = function () {
        // не добавлять пустые задания
        if ($scope.taskText) {
          $scope.taskList.push({text: $scope.taskText, done: false, important: false});
          $scope.taskText = '';
        } else {
          console.log('Empty input');
        }
      };

      // вычисляемое свойство оставшихся для выполнения задач
      $scope.remaining = function () {
        let count = 0;
        angular.forEach($scope.taskList, function (task) {
          count += task.done ? 0 : 1;
        });
        return count;
      };

      $scope.archive = function () {
        const oldTaskList = $scope.taskList;
        $scope.taskList = [];
        angular.forEach(oldTaskList, function (task) {
          if (!task.done) {
            $scope.taskList.push(task);
          }
        });
        console.log('Old task list: ', oldTaskList);
      };

      $scope.deleteItem = function () {
        // const index = $scope.taskArray.indexOf(item);
        // $scope.taskArray.splice(index, 1)
        // this содержит атрибут $index, который похоже указывает на индекс текущего элемента
        $scope.taskList.splice(this.$index, 1);
      };

      $scope.importantItem = function (item) {
        item.important = !item.important;
      };

    });