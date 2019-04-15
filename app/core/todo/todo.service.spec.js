'use strict';
describe('todoService', function () {

  beforeEach(module('core.todo'));

  describe('get data with $resource services', function () {
    let todoService;
    let $httpBackend;
    let restdb;
    const mockTasksData = [
      {id: '_d05295jg7', text: 'Task 1'},
      {id: '_x0h29fnbi', text: 'Task 2'},
      {id: '_0h2dj54b4', text: 'Task 3'}
    ];
    const mockTask = {id: '_x0h29fnbi', text: 'Task 2'};
    beforeEach(function () {
      jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(inject(function (_todoService_, _$httpBackend_, _restdb_) {
      todoService = _todoService_;
      $httpBackend = _$httpBackend_;
      restdb = _restdb_;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('exists', function () {
      expect(!!todoService).toBe(true);
    });

    it('getAllTasks (should fetch the tasks data from `restdb` server)', function () {
      let taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}?apikey=${restdb.apikey}`;
      $httpBackend.expectGET(taskUrl).respond(mockTasksData);

      todoService.getAllTasks()
          .then((tasks) => {
            expect(tasks).toEqual(mockTasksData);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

    it('getTaskById (should fetch the task data from from `restdb` server by taskId)', function () {
      let taskID = '_x0h29fnbi';
      let taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}/${taskID}?apikey=${restdb.apikey}`;
      $httpBackend.expectGET(taskUrl).respond(mockTask);

      todoService.getTaskById(taskID)
          .then((task) => {
            expect(task).toEqual(mockTask);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

  });

});
