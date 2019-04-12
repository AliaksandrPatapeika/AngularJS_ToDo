(function () {
  'use strict';

  angular
      .module('errorContainer')
      .component('errorContainer', {
        templateUrl: 'components/error-container/error-container.template.html',
        controller: ErrorContainerController,
        bindings: {
          error: '<'
        }
      });

  ErrorContainerController.$inject = ['todoService'];

  function ErrorContainerController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.navigate = navigate;
      $ctrl.reloadState = reloadState;
    }

    function navigate(toState, params) {
      todoService.navigate(toState, params);
    }

    function reloadState() {
      todoService.reloadState();
    }

  }

})();
