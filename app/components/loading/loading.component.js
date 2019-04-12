(function () {
  'use strict';

  angular
      .module('loading')
      .component('loading', {
        templateUrl: 'components/loading/loading.template.html',
        controller: LoadingController,
        bindings: {
          loading: '<'
        }
      });

  function LoadingController() {
    let $ctrl = this;

  }

})();
