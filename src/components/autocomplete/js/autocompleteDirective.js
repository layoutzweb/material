(function () {
  'use strict';
  angular
      .module('material.components.autocomplete')
      .directive('mdAutocomplete', MdAutocomplete);

  function MdAutocomplete () {
    return {
      template: '\
        <label>\
          <input type="text"\
              ng-model="searchText"\
              ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
              placeholder="{{placeholder}}"\
              ng-keydown="$mdAutocompleteCtrl.onKeydown($event)"/>\
          <button\
              type="button"\
              ng-if="searchText"\
              ng-click="$mdAutocompleteCtrl.clear()"> X </button>\
          <md-progress-linear ng-if="$mdAutocompleteCtrl.loading" md-mode="indeterminate"></md-progress-linear>\
        </label>\
        <ul>\
          <li ng-repeat="(index, item) in $mdAutocompleteCtrl.matches"\
              ng-class="{ selected: index === $mdAutocompleteCtrl.index }"\
              ng-if="searchText && !$mdAutocompleteCtrl.hidden"\
              ng-click="$mdAutocompleteCtrl.select(index)"\
              ng-transclude\
              md-list-item="$mdAutocompleteCtrl.itemName">\
          </li>\
        </ul>',
      transclude: true,
      controller: 'MdAutocompleteCtrl',
      controllerAs: '$mdAutocompleteCtrl',
      scope: {
        searchText: '=mdSearchText',
        selectedItem: '=mdSelectedItem',
        itemsExpr: '@mdItems',
        itemText: '@mdItemText',
        placeholder: '@placeholder'
      }
    };
  }
})();
