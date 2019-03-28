'use strict';

// Чтобы использовать сервис в Angular, нужно объявить имена необходимых зависимостей в качестве
// аргументов функции конструктора контроллера, следующим образом: function TodoListController($http) {...}
// Инжектор зависимостей Angular предоставляет сервисы контроллеру при его создании.
// Префикс `$` служит для пространства имен Angular сервисов.
function TodoListController(Task, $location) {
  // TODO BEST PRACTICE !!!!!
  //
  // const vm = this;
  //
  // vm.gotoSession = gotoSession;
  // vm.refresh = refresh;
  // vm.search = search;
  // vm.sessions = [];
  // vm.title = 'Sessions';
  //
  // ////////////
  //
  // function gotoSession() {
  //   /* */
  // }
  //
  // function refresh() {
  //   /* */
  // }
  //
  // function search() {
  //   /* */
  // }




  // Контроллер, где будут обрабатываться все данные.
  // Чтобы избегать непосредственного использования scope, следует использовать экземпляр контроллера
  // (присваивать данные и методы свойствам контроллера (`this` внутри конструктора контроллера), а не
  // непосредственно в scope)
  this.filterButtons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  this.filterName = 'all';

  // Хранилище для всех заданий
  // URL берется относительно файла `index.html`
  // Сервис $http возвращает объект promise, который имеет метод then(). Этот метод вызывается для обработки
  // асинхронного ответа для присваивания списка заданий контроллеру как свойство `tasks`
  // $http.get('data/data.json').then((response) => {
  // В свойстве `data` объекта ответа, переданного обратному вызову (callback) содержится массив объектов списка заданий из JSON файла
  // this.tasks = response.data;
  // });


  // Получаем коллекцию с сервера
  // Синхронно возвращается «будущее» - объект promise, который будет заполнен данными, когда будет получен ответ XHR.
  // Из-за привязки данных в Angular мы можем использовать это будущее и связать его с нашим шаблоном. Затем, когда данные поступят, представление будет автоматически обновлено.
  this.tasks = Task.query();

  this.remainingTasks = () => {
    return this.tasks.filter((task) => !task.done).length;
  };

  this.archiveCompletedTasks = () => {
    const oldTasks = this.tasks;
    this.tasks = [];
    oldTasks.forEach((task) => {
      if (!task.done) {
        this.tasks.push(task);
      }
    });
    console.log('Old task list: ', oldTasks);
  };

  this.importantTask = (task) => {
    task.important = !task.important;
  };

  this.deleteTask = (task) => {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  };

  this.IdGenerator = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  this.addTask = () => {
    // не добавлять пустые задания
    if (this.addTaskInputText) {
      this.tasks.push({
        id: this.IdGenerator(),
        text: this.addTaskInputText,
        done: false,
        important: false,
        date: Date.now(),
        description: ""
      });
      this.addTaskInputText = '';
    } else {
      console.log('Empty input');
    }
  };

  this.goToTaskDetailView = (task) => {
    $location.path(`/tasks/${task.id}`);
  };

}

// Зарегистрировать компонент `todoList` в модуле `todoList` вместе со связанным с ним контроллером и шаблоном
// При минимизации javascript кода контроллера `TodoListController`, все аргументы функции также будут
// минимизированы, и инжектор зависимостей не сможет правильно идентифицировать сервисы.
// Чтобы этого избежать, следует объявить функцию с зависимостями в виде строки, которая не будет минимизирована.
// Для этого используется встроенная аннотация, где вместо объявления функции идет массив, который содержит список сервисов, за которым следует сама функция в качестве последнего элемента массива.
angular.module('todoList')
    .component('todoList', {
      // URL берется относительно файла `index.html`
      templateUrl: 'todo-list/todo-list.template.html',
      controller: ['Task', '$location', TodoListController]
    });

