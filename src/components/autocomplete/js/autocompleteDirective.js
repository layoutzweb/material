(function () {
  'use strict';
  angular
      .module('material.components.autocomplete')
      .directive('mdAutocomplete', MdAutocomplete);

  function MdAutocomplete ($mdUtil) {
    return {
      template: '\
        <md-autocomplete-wrap role="listbox">\
          <input type="text"\
              ng-model="searchText"\
              ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
              placeholder="{{placeholder}}"\
              aria-label="{{placeholder}}"\
              ng-keydown="$mdAutocompleteCtrl.onKeydown($event)"/>\
          <button\
              type="button"\
              ng-if="searchText"\
              ng-click="$mdAutocompleteCtrl.clear()">\
              <span aria-hidden="true">X</span>\
              <span class="visuallyhidden">Clear</span>\
              </button>\
          <md-progress-linear ng-if="$mdAutocompleteCtrl.loading" md-mode="indeterminate"></md-progress-linear>\
        </md-autocomplete-wrap>\
        <ul>\
          <li ng-repeat="(index, item) in $mdAutocompleteCtrl.matches"\
              ng-class="{ selected: index === $mdAutocompleteCtrl.index }"\
              ng-if="searchText && !$mdAutocompleteCtrl.hidden"\
              ng-click="$mdAutocompleteCtrl.select(index)"\
              ng-transclude\
              md-list-item="$mdAutocompleteCtrl.itemName">\
          </li>\
        </ul>\
        <aria-status class="visuallyhidden">\
          <p ng-repeat="item in $mdAutocompleteCtrl.matches">{{item.display}}</p>\
        </aria-status>',
      transclude: true,
      controller: 'MdAutocompleteCtrl',
      controllerAs: '$mdAutocompleteCtrl',
      scope: {
        searchText: '=mdSearchText',
        selectedItem: '=mdSelectedItem',
        itemsExpr: '@mdItems',
        itemText: '@mdItemText',
        placeholder: '@placeholder'
      },
      link: function(scope, element, attr, MdAutocompleteCtrl) {
        var input = element.find('input'),
            list = element.find('ul'),
            status = element.find('aria-status');

        var listId = list.attr('id') || ('ul_' + $mdUtil.nextUid());

        list.attr({
          'id': listId,
          'role': 'presentation'
        });

        input.attr({
          'aria-owns': listId,
          'aria-autocomplete': 'list',
          'aria-haspopup': 'true',
          'aria-expanded': !MdAutocompleteCtrl.hidden+'',
          'aria-activedescendant': ''
        });

        status.attr({
          'aria-atomic': 'true',
          'role': 'status',
          'aria-live': 'polite'
        });
      }
    };
  }
})();
