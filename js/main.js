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

          $scope.addTaskInputText = '';
          $scope.searchTaskInputText = '';
          $scope.filterTasks = 'all';

          $scope.onFilterChange = (filterName) => {
            $scope.filterTasks = filterName;
          };

          $scope.searchTasks = function (taskList, searchText) {
            if (searchText) {
              return taskList.filter((task) => {
                return task.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
              });
            } else {
              return taskList;
            }
          };

          $scope.filterButtonsList = [
            {
              name: 'all',
              label: 'All',
              classNames: function () {
                return 'btn ' + ((this.name === $scope.filterTasks) ? 'btn-filter-active' : 'btn-filter');
              },
            },
            {
              name: 'active',
              label: 'Active',
              classNames: function () {
                return 'btn ' + ((this.name === $scope.filterTasks) ? 'btn-filter-active' : 'btn-filter');
              },
            },
            {
              name: 'done',
              label: 'Done',
              classNames: function () {
                return 'btn ' + ((this.name === $scope.filterTasks) ? 'btn-filter-active' : 'btn-filter');
              },
            }
          ];

          $scope.taskStatusFilter = function (taskList, filterName) {
            switch (filterName) {
              case 'all':
                return taskList;
              case 'active':
                return taskList.filter((task) => (!task.done));
              case 'done':
                return taskList.filter((task) => task.done);
              default:
                console.log('default for debug', filterName);
                return taskList;
            }
          };

          $scope.visibleTasks = function () {
            return $scope.searchTasks($scope.taskStatusFilter($scope.taskList, $scope.filterTasks), $scope.searchTaskInputText);
          };

          $scope.addTask = function () {
            // не добавлять пустые задания
            if ($scope.addTaskInputText) {
              $scope.taskList.push({text: $scope.addTaskInputText, done: false, important: false});
              $scope.addTaskInputText = '';
            } else {
              console.log('Empty input');
            }
          };

          // вычисляемое свойство оставшихся для выполнения задач
          $scope.remaining = function () {
            return $scope.taskList.filter((task) => !task.done).length;
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

          $scope.deleteTask = function (task) {
            const index = $scope.taskList.indexOf(task);
            $scope.taskList.splice(index, 1)
          };

          $scope.importantTask = function (task) {
            task.important = !task.important;
          };

        }
    );