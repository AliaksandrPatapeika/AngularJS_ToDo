(function () {
  'use strict';

  angular
      .module('editText')
      .component('editText', {
        templateUrl: 'components/edit-text/edit-text.template.html',
        controller: EditTextController,
        bindings: {
          task: '<',
          text: '='
        }
      });

  EditTextController.$inject = ['todoService'];

  function EditTextController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.mode = 'viewText';
      $ctrl.edit = edit;
      $ctrl.save = save;
      $ctrl.cancel = cancel;
    }

    function edit(storeText) {
      $ctrl.storeText = storeText;
      $ctrl.mode = 'editText';
    }

    function save() {
      $ctrl.loading = true;
      todoService.updateTask($ctrl.task)
          .then(() => {
            $ctrl.loading = false;
            $ctrl.mode = 'viewText';
          });
    }

    function cancel() {
      if ($ctrl.text !== $ctrl.storeText) {
        $ctrl.text = $ctrl.storeText;
      }

      $ctrl.mode = 'viewText';
    }

  }

})();
