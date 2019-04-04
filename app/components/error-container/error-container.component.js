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

  function ErrorContainerController() {
    let $ctrl = this;

  }

})();
