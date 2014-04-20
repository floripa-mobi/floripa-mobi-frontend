define([
  'underscore'
],
function (_) {
  /**
    Given an array of numbers, returns the 3 closest numbers to the given reference.
    Note: It assumes the array is sorted.
   */
  return function (array, reference) {
    if (array.length <= 4) { return array; }

    var firstBigger = _(array).find(function (number) {
      return number >= reference;
    });

    var index = array.indexOf(firstBigger);

    if (index === 0) { index = 1; }
    if (index === -1 || index === array.length - 1) { index = array.length - 3; }

    return array.slice(index - 1, index + 3);
  };
});
