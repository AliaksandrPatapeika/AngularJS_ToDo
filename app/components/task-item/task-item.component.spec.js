'use strict';

describe('taskItem component', function () {
  beforeEach(module('taskItem'));

  describe('taskList filter', function () {
    let filterInstance;
    let tasks = [];

    beforeEach(inject(function (taskListFilter) {
      filterInstance = taskListFilter;
      tasks = [
        {text: 'learn AngularJS', done: true, important: false},
        {text: 'build an AngularJS app', done: false, important: false},
        {text: 'Other todo', done: false, important: true}
      ]
    }));

    it('should filter tasks by `active` tasks (2 tasks)', function () {
      expect(filterInstance(tasks, 'active').length).toBe(2);
    });

    it('should filter tasks by `done` tasks (1 todo)', function () {
      expect(filterInstance(tasks, 'done').length).toBe(1);
    });

    it('should filter tasks by `all` tasks (3 tasks)', function () {
      expect(filterInstance(tasks, 'all').length).toBe(3);
    });

  });

});
