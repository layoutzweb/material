(function () {
  'use strict';
  angular
      .module('material.components.autocomplete')
      .controller('MdHighlightCtrl', MdHighlightCtrl);

  function MdHighlightCtrl ($scope, $element, $interpolate) {
    var term = $element.attr('md-highlight-text'),
        text = $interpolate($element.text())($scope.$parent);
    $scope.$watch(term, function (term, oldTerm) {
      var regex = new RegExp('^' + sanitize(term), 'i'),
          html = text.replace(regex, function (match) {
            return '<span class="highlight">' + match + '</span>';
          });
      $element.html(html);
    });

    function sanitize (term) {
      if (!term) return term;
      return term
          .replace(/[\*\[\]\(\)\{\}\\\^\$]/g, function (match) { return '\\' + match; });
    }
  }

})();
