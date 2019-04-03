(function () {
  'use strict';

  angular
      .module('search')
      .component('search', {
        templateUrl: 'components/search/search.template.html',
        controller: SearchController,
        bindings: {
          searchTask: '='
        }
      });

  function SearchController() {
    let $ctrl = this;
  }

})();
