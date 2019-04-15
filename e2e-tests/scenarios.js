'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('TodoList Application', function () {

  it('should redirect `index.html` to `index.html#!/tasks', function () {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/tasks');
  });

  describe('View: Todo list', function () {

    beforeEach(function () {
      browser.get('index.html#!/tasks');
      // Turns off ng-animate animations for all elements in the app
      element(by.css('body')).allowAnimations(false);
    });

    it('should filter the task list as a user types into the search box', function () {
      const taskList = element.all(by.repeater('task in $ctrl.tasks'));
      const search = element(by.model('$ctrl.searchTask.text'));

      expect(taskList.count()).toBe(3);

      search.sendKeys('task');
      expect(taskList.count()).toBe(1);

      search.clear();
      search.sendKeys('angular');
      expect(taskList.count()).toBe(2);
    });

    it('should be possible to filter task list via the filter buttons group', function () {
      const filterButtonAll = element(by.css('label[for="radioAll"]'));
      const filterButtonActive = element(by.css('label[for="radioActive"]'));
      const filterButtonDone = element(by.css('label[for="radioDone"]'));
      const taskList = element.all(by.repeater('task in $ctrl.tasks'));

      function getTaskTextList() {
        return taskList.map(function (task) {
          return task.element(by.css('.task-list-item-label span')).getText();
        });
      }

      filterButtonActive.click();

      expect(getTaskTextList()).toEqual([
        'build an AngularJS app',
        'Other task'
      ]);

      filterButtonDone.click();

      expect(getTaskTextList()).toEqual([
        'learn AngularJS'
      ]);

      filterButtonAll.click();

      expect(getTaskTextList()).toEqual([
        'learn AngularJS',
        'build an AngularJS app',
        'Other task'
      ]);

    });

    it('should render task specific links', function () {
      const search = element(by.model('$ctrl.searchTask.text'));
      search.sendKeys('angular');

      element.all(by.css('.task-list .task-list-item .btn-info')).last().click();
      expect(browser.getCurrentUrl()).toContain('index.html#!/tasks/5cb4776a4a61e2100001a718');
    });

  });

  describe('View: Task detail', function () {

    beforeEach(function () {
      browser.get('index.html#!/tasks/5cb4774a4a61e2100001a714');
    });

    it('should display the `learn AngularJS` task detail page', function () {
      expect(element(by.binding('$ctrl.text')).getText()).toBe('learn AngularJS');
    });

  });

});
