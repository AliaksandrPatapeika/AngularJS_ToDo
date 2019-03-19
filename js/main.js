const model = {
  // хранилище для всех заданий
  taskList: [
    {text: 'learn AngularJS', done: true, important: false},
    {text: 'build an AngularJS app', done: false, important: false},
    {text: 'Other task', done: false, important: true}
  ],
  filterButtonsList: [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ],
  filterTasks: 'all',
  searchTaskInputText: ''
};

// создание модуля
angular.module('todoListApp', [])
// контроллер, где будут обрабатываться все данные. $scope - хранилище
    .controller('todoListCtrl', function ($scope) {

          $scope.data = model;

          // вычисляемое свойство оставшихся для выполнения задач
          $scope.remainingTasks = function () {
            return $scope.data.taskList.filter((task) => !task.done).length;
          };

          $scope.archiveCompletedTasks = function () {
            const oldTaskList = $scope.data.taskList;
            $scope.data.taskList = [];
            angular.forEach(oldTaskList, function (task) {
              if (!task.done) {
                $scope.data.taskList.push(task);
              }
            });
            console.log('Old task list: ', oldTaskList);
          };

          $scope.onFilterChange = (filterName) => {
            $scope.data.filterTasks = filterName;
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
            return $scope.searchTasks($scope.taskStatusFilter($scope.data.taskList, $scope.data.filterTasks), $scope.data.searchTaskInputText);
          };


          $scope.importantTask = function (task) {
            task.important = !task.important;
          };


          $scope.deleteTask = function (task) {
            const index = $scope.data.taskList.indexOf(task);
            $scope.data.taskList.splice(index, 1)
          };

          $scope.addTask = function () {
            // не добавлять пустые задания
            if ($scope.addTaskInputText) {
              $scope.data.taskList.push({
                text: $scope.addTaskInputText,
                done: false,
                important: false
              });
              $scope.addTaskInputText = '';
            } else {
              console.log('Empty input');
            }
          };

        }
    );
