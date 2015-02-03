(function () {
  'use strict';
  angular
      .module('material.components.autocomplete')
      .directive('mdListItem', MdAutocomplete);

  function MdAutocomplete ($compile, $mdUtil) {
    return {
      terminal: true,
      link: link,
      scope: true
    };
    function link (scope, element, attr) {
      var itemName = scope.$eval(attr.mdListItem);
      scope[itemName] = scope.item;
      $compile(element.contents())(scope);

      element.attr({
        'role': 'option',
        'id': 'item_' + $mdUtil.nextUid()
      });
    }
  }
})();
