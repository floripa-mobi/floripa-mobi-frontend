define([
  'underscore'
],
function (_) {
  return function (array, reference) {
    if (array.length <= 3) { return array; }

    var firstBigger = _(array).find(function (number) {
      return number >= reference;
    });

    var index = array.indexOf(firstBigger);

    if (index === 0) { index = 1; }
    if (index === -1 || index === array.length - 1) { index = array.length - 2; }

    return array.slice(index - 1, index + 2);
  };
});
