(function () {
  'use strict';

  angular
      .module('filterButtonsGroup')
      .component('filterButtonsGroup', {
        templateUrl: 'components/filter-buttons-group/filter-buttons-group.template.html',
        controller: FilterButtonsGroupController,
        bindings: {
          filterName: '='
        }
      });

  function FilterButtonsGroupController() {
    let $ctrl = this;

    $ctrl.filterButtons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'}
    ];

  }

})();
