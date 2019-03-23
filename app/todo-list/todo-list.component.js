'use strict';

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
  ]
};

function TodoListController() {
  // контроллер, где будут обрабатываться все данные.
  // Чтобы избегать непосредственного использования scope, следует использовать наш экземпляр контроллера
  // (присваивать данные и методы свойствам нашего контроллера («this» внутри конструктора контроллера), а не
  // непосредственно в scope)
  this.data = model;

  // вычисляемое свойство оставшихся для выполнения задач
  this.remainingTasks = function () {
    return this.data.taskList.filter((task) => !task.done).length;
  };

  this.archiveCompletedTasks = function () {
    const oldTaskList = this.data.taskList;
    this.data.taskList = [];
    oldTaskList.forEach((task) => {
      if (!task.done) {
        this.data.taskList.push(task);
      }
    });
    console.log('Old task list: ', oldTaskList);
  };

  this.importantTask = function (task) {
    task.important = !task.important;
  };

  this.deleteTask = function (task) {
    const index = this.data.taskList.indexOf(task);
    this.data.taskList.splice(index, 1)
  };

  this.addTask = function () {
    // не добавлять пустые задания
    if (this.addTaskInputText) {
      this.data.taskList.push({
        text: this.addTaskInputText,
        done: false,
        important: false
      });
      this.addTaskInputText = '';
    } else {
      console.log('Empty input');
    }
  };
}

// Зарегистрировать компонент `todoList` в модуле `todoList` вместе со связанным с ним контроллером и шаблоном
angular.module('todoList')
    .component('todoList', {
      // URL берется относительно файла `index.html`
      templateUrl: 'todo-list/todo-list.template.html',
      controller: TodoListController
    });

