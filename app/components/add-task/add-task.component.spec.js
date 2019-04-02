'use strict';

describe('addTask component', function () {

  beforeEach(module('addTask'));
  beforeEach(module('todoList'));

  // Тестирование контроллера
  describe('AddTaskController test', function () {
    let controllerAddTaskInstance;
    let controllerToDoListInstance;
    let $httpBackend;

    beforeEach(inject(function ($componentController, _$httpBackend_) {
      // Фиктивный $http сервис для юнит тестов
      $httpBackend = _$httpBackend_;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET('data/tasks.json')
          .respond(
              [
                {text: 'learn AngularJS', done: true, important: false},
                {text: 'build an AngularJS app', done: false, important: false},
                {text: 'Other todo', done: false, important: true}
              ]
          );
      // создания экземпляр контроллера компонента `addTask`
      controllerAddTaskInstance = $componentController('addTask');
      controllerToDoListInstance = $componentController('todoList');
      controllerAddTaskInstance.parent = controllerToDoListInstance;
    }));

    it('should add new two tasks to `tasks` property (5 tasks)', function () {
      $httpBackend.flush();
      controllerAddTaskInstance.addTaskInputText = 'test task1';
      controllerAddTaskInstance.addTask();
      controllerAddTaskInstance.addTaskInputText = 'test task2';
      controllerAddTaskInstance.addTask();
      expect(controllerToDoListInstance.tasks.length).toBe(5);
    });

  });

});
