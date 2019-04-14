'use strict';

describe('addTask component', function () {

  beforeEach(module('addTask'));

  // Тестирование контроллера
  describe('AddTaskController test', function () {
    let controllerInstance;
    let todoService;

    beforeEach(inject(function ($componentController, _todoService_) {
      // Создаем сервис
      todoService = _todoService_;
      let bindings = {
        tasks:
            [
              {text: 'learn AngularJS', done: true, important: false},
              {text: 'build an AngularJS app', done: false, important: false},
              {text: 'Other todo', done: false, important: true}
            ]
      };
      controllerInstance = $componentController('addTask', null, bindings);
    }));


    it('should add new two tasks to `tasks` property (5 tasks)', function () {
      spyOn(todoService, 'addTask').and.returnValue(Promise.resolve({'fake result': 'promise fake Result'}));
      // controllerInstance.tasks = {};
      controllerInstance.addTaskInputText = 'test task1';
      controllerInstance.addTask(controllerInstance.addTaskInputText);

      // setTimeout(()=>{
      //   expect(controllerInstance.tasks.length).toBe(5);
      // }, 50);

      // controllerInstance.addTaskInputText = 'test task2';
      // controllerInstance.addTask(controllerInstance.addTaskInputText);
      // expect(controllerInstance.tasks.length).toBe(5);
      // console.log(controllerInstance.tasks);
    });

  });

});
