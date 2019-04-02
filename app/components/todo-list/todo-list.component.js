(function () {
  'use strict';

  // Зарегистрировать компонент `todoList` в модуле `todoList` вместе со связанным с ним контроллером и шаблоном
// При минимизации javascript кода контроллера `TodoListController`, все аргументы функции также будут
// минимизированы, и инжектор зависимостей не сможет правильно идентифицировать сервисы.
// Чтобы этого избежать, следует объявить функцию с зависимостями в виде строки, которая не будет минимизирована.
// Для этого используется встроенная аннотация, где вместо объявления функции идет массив, который содержит список сервисов, за которым следует сама функция в качестве последнего элемента массива.
  angular
      .module('todoList')
      .component('todoList', {
        // URL берется относительно файла `index.html`
        templateUrl: 'components/todo-list/todo-list.template.html',
        controller: TodoListController
      });

  TodoListController.$inject = ['$location', 'todoService'];

  // Чтобы использовать сервис в Angular, нужно объявить имена необходимых зависимостей в качестве
// аргументов функции конструктора контроллера, следующим образом: function TodoListController($http) {...}
// Инжектор зависимостей Angular предоставляет сервисы контроллеру при его создании.
// Префикс `$` служит для пространства имен Angular сервисов.
  function TodoListController($location, todoService) {
    // Контроллер, где будут обрабатываться все данные.
    // Чтобы избегать непосредственного использования scope, следует использовать экземпляр контроллера
    // (присваивать данные и методы свойствам контроллера (`this` внутри конструктора контроллера), а не
    // непосредственно в scope)
    let $ctrl = this;

    $ctrl.filterButtons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'}
    ];

    $ctrl.filterName = 'all';

    // Хранилище для всех заданий
    // Получаем коллекцию с сервера
    // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
    // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.

    activate();

    $ctrl.importantTask = importantTask;
    $ctrl.deleteTask = deleteTask;
    $ctrl.goToTaskDetailView = goToTaskDetailView;

    ////////////

    function activate() {
      $ctrl.tasks = todoService.getTaskList().query();
    }

    function importantTask(task) {
      task.important = !task.important;
    }

    function deleteTask(task) {
      const index = $ctrl.tasks.indexOf(task);
      $ctrl.tasks.splice(index, 1);
    }

    function goToTaskDetailView(task) {
      $location.path(`/tasks/${task.id}`);
    }

  }

})();
